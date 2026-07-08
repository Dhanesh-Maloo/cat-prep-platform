-- CAT Prep Platform — Phase 1 schema
-- Not yet applied to any Supabase project. Run this in the SQL editor once
-- a project is created and credentials are added to .env.

create extension if not exists "pgcrypto";

create table if not exists sections (
  id text primary key,
  name text not null,
  full_name text not null,
  sort_order int not null default 0
);

create table if not exists topics (
  id text primary key,
  section_id text not null references sections(id) on delete cascade,
  name text not null,
  sort_order int not null default 0
);

create table if not exists subtopics (
  id text primary key,
  topic_id text not null references topics(id) on delete cascade,
  name text not null,
  difficulty text not null check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  sort_order int not null default 0
);

create table if not exists notes (
  subtopic_id text primary key references subtopics(id) on delete cascade,
  body text not null,
  updated_at timestamptz not null default now()
);

create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  subtopic_id text not null references subtopics(id) on delete cascade,
  youtube_id text not null,
  title text not null
);

create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  subtopic_id text not null references subtopics(id) on delete cascade,
  title text not null,
  url text not null,
  status text not null default 'approved' check (status in ('pending', 'approved', 'rejected'))
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  -- nullable: mock-test-only questions aren't always tied to a practice subtopic
  subtopic_id text references subtopics(id) on delete cascade,
  section text,
  type text not null default 'mcq' check (type in ('mcq', 'tita')),
  question text not null,
  options jsonb, -- null for tita
  correct_index int, -- mcq only
  correct_answer text, -- tita only
  explanation text not null,
  difficulty text check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  recommended_time_seconds int,
  source text,
  year int
);

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  target_exam_date date,
  current_level text,
  created_at timestamptz not null default now()
);

-- Auto-create a public.users row whenever someone signs up via Supabase Auth,
-- so the app never has to remember to do it client-side.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table if not exists question_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  selected_index int, -- mcq only
  text_answer text, -- tita only
  is_correct boolean not null,
  time_taken_seconds int,
  error_type text check (error_type in ('silly_mistake', 'conceptual_gap', 'time_pressure')),
  marked_for_review boolean not null default false,
  note text, -- personal mistake-notebook note: why it was missed, what to do differently
  attempted_at timestamptz not null default now()
);

create table if not exists mock_tests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null default 'full' check (type in ('sectional', 'full')),
  duration_minutes int not null default 120,
  -- [{ "key": "VARC", "name": "...", "duration_minutes": 40 }, ...]
  sections jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create table if not exists mock_test_questions (
  mock_test_id uuid not null references mock_tests(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  section text not null,
  order_index int not null,
  primary key (mock_test_id, question_id)
);

create table if not exists mock_test_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  mock_test_id uuid not null references mock_tests(id) on delete cascade,
  raw_score numeric,
  percentile numeric,
  section_scores jsonb not null default '{}',
  start_time timestamptz not null default now(),
  end_time timestamptz
);

-- Institute-style "All India Rank": lets any user fetch the anonymized score
-- distribution for a specific mock test (raw_score + section_scores only, no
-- user_id, no timestamps) so the client can compute rank/percentile/cohort
-- averages against real test-takers instead of a generic historical table.
-- security definer to narrowly bypass the "own rows only" RLS policy above
-- for just this anonymized read.
create or replace function get_mock_test_cohort(p_mock_test_id uuid)
returns table (raw_score numeric, section_scores jsonb)
language sql
security definer
set search_path = public
as $$
  select raw_score, section_scores
  from mock_test_attempts
  where mock_test_id = p_mock_test_id
    and end_time is not null;
$$;

grant execute on function get_mock_test_cohort(uuid) to authenticated, anon;

-- APPROXIMATION ONLY — not official CAT data. Mirrors src/lib/percentileTable.js.
create table if not exists percentile_lookup (
  min_score int primary key,
  percentile numeric not null
);

insert into percentile_lookup (min_score, percentile) values
  (140, 99.5), (120, 99), (100, 97), (85, 95), (70, 90), (55, 80),
  (42, 70), (30, 60), (20, 50), (10, 35), (0, 20), (-10, 10), (-66, 1)
on conflict (min_score) do nothing;

create table if not exists study_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  target_exam_date date not null,
  plan jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  subtopic_id text references subtopics(id) on delete cascade,
  question_id uuid references questions(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Row Level Security: users only see their own attempts/plans/bookmarks.
-- Syllabus content tables (sections/topics/.../questions) are public read.
alter table users enable row level security;
alter table question_attempts enable row level security;
alter table mock_test_attempts enable row level security;
alter table study_plans enable row level security;
alter table bookmarks enable row level security;

create policy "Users manage their own row" on users
  for all using (auth.uid() = id);

create policy "Users manage their own attempts" on question_attempts
  for all using (auth.uid() = user_id);

create policy "Users manage their own mock attempts" on mock_test_attempts
  for all using (auth.uid() = user_id);

create policy "Users manage their own study plans" on study_plans
  for all using (auth.uid() = user_id);

create policy "Users manage their own bookmarks" on bookmarks
  for all using (auth.uid() = user_id);

-- Syllabus/mock-test content is public catalog data, not user-owned — readable
-- by anyone (including the anon key), writable only via the service role
-- (e.g. scripts/seed.mjs or an admin panel), never directly by end users.
alter table sections enable row level security;
alter table topics enable row level security;
alter table subtopics enable row level security;
alter table notes enable row level security;
alter table videos enable row level security;
alter table resources enable row level security;
alter table questions enable row level security;
alter table mock_tests enable row level security;
alter table mock_test_questions enable row level security;
alter table percentile_lookup enable row level security;

create policy "Public read access" on sections for select using (true);
create policy "Public read access" on topics for select using (true);
create policy "Public read access" on subtopics for select using (true);
create policy "Public read access" on notes for select using (true);
create policy "Public read access" on videos for select using (true);
create policy "Public read access" on resources for select using (true);
create policy "Public read access" on questions for select using (true);
create policy "Public read access" on mock_tests for select using (true);
create policy "Public read access" on mock_test_questions for select using (true);
create policy "Public read access" on percentile_lookup for select using (true);

-- Phase 3/4: study planner, spaced repetition, admin panel, doubt forum

alter table users add column if not exists role text not null default 'member' check (role in ('member', 'admin'));

-- Spaced-repetition bookkeeping on bookmarked items (SM-2-lite: interval
-- doubles-ish on a correct recall, resets to 1 day on a miss).
alter table bookmarks add column if not exists next_review_at timestamptz not null default now();
alter table bookmarks add column if not exists interval_days int not null default 1;
alter table bookmarks add column if not exists ease numeric not null default 2.5;

-- author_name is denormalized at post time (rather than joined from `users`)
-- because the users table's RLS only allows reading your own row — a join
-- would silently return null for every other author.
create table if not exists forum_threads (
  id uuid primary key default gen_random_uuid(),
  subtopic_id text not null references subtopics(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  author_name text not null,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists forum_replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references forum_threads(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  author_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table forum_threads enable row level security;
alter table forum_replies enable row level security;

create policy "Public read access" on forum_threads for select using (true);
create policy "Authenticated users create threads" on forum_threads for insert with check (auth.uid() = user_id);
create policy "Users manage their own threads" on forum_threads for update using (auth.uid() = user_id);
create policy "Users delete their own threads" on forum_threads for delete using (auth.uid() = user_id);

create policy "Public read access" on forum_replies for select using (true);
create policy "Authenticated users create replies" on forum_replies for insert with check (auth.uid() = user_id);
create policy "Users manage their own replies" on forum_replies for update using (auth.uid() = user_id);
create policy "Users delete their own replies" on forum_replies for delete using (auth.uid() = user_id);

-- Admins (users.role = 'admin') can write to catalog content directly from
-- the admin panel, using the regular anon-authenticated client rather than
-- the service role. Read access for everyone is already covered above.
create policy "Admins manage sections" on sections for all
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from users where id = auth.uid() and role = 'admin'));
create policy "Admins manage topics" on topics for all
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from users where id = auth.uid() and role = 'admin'));
create policy "Admins manage subtopics" on subtopics for all
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from users where id = auth.uid() and role = 'admin'));
create policy "Admins manage notes" on notes for all
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from users where id = auth.uid() and role = 'admin'));
create policy "Admins manage videos" on videos for all
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from users where id = auth.uid() and role = 'admin'));
create policy "Admins manage resources" on resources for all
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from users where id = auth.uid() and role = 'admin'));
create policy "Admins manage questions" on questions for all
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from users where id = auth.uid() and role = 'admin'));
create policy "Admins manage mock_tests" on mock_tests for all
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from users where id = auth.uid() and role = 'admin'));
create policy "Admins manage mock_test_questions" on mock_test_questions for all
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from users where id = auth.uid() and role = 'admin'));

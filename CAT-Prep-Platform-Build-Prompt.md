# Build Prompt: CAT Exam Preparation Web Platform

Copy everything below this line into Claude Code (or Cursor / v0 / Lovable / any AI coding tool).

---

## Project Overview

Build a full-stack web application for CAT (Common Admission Test — India's premier MBA entrance exam) preparation. The platform should combine structured syllabus content, practice questions, mock tests, performance analytics, and curated free resources — all in one place.

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend/DB/Auth:** Supabase (Postgres + Auth + Storage)
- **Hosting:** Cloudflare Pages
- **Charts/Analytics UI:** Recharts
- **State management:** React Context or Zustand (keep it simple, no over-engineering)

## Core Modules to Build

### 1. Syllabus & Content Tree
- Hierarchical structure: **Section → Topic → Sub-topic**
  - Sections: VARC (Verbal Ability & Reading Comprehension), DILR (Data Interpretation & Logical Reasoning), QA (Quantitative Aptitude)
- Each sub-topic page must contain:
  - Short written notes (concept summary, 200–400 words)
  - One embedded YouTube video (best available explainer — store as a curated link, not auto-fetched)
  - 2–3 free resource links (PDFs, articles, prior year papers)
  - Difficulty tag: Beginner / Intermediate / Advanced
- Build an admin panel (simple CRUD) so content can be added/edited without touching code

### 2. Practice Engine
- Topic-wise practice sets — untimed, instant answer feedback with explanations
- Sectional tests — timed, mimics real exam section constraints
- Full-length mock tests — replicate actual CAT UI/UX (on-screen calculator, section-lock, timer)
- Question bank schema: question text, options, correct answer, explanation, topic tag, difficulty tag, source/year

### 3. Analytics & Reporting Dashboard
- Percentile predictor (based on mock score vs. historical percentile data — can start with a static lookup table, refine later)
- Topic-wise strength/weakness heatmap
- Time-per-question tracking and analysis
- Error classification: silly mistake / conceptual gap / time pressure
- Progress-over-time line chart (score trend across attempts)

### 4. Personalization
- Study planner: user inputs target exam date + current level → system generates a day-by-day/week-by-week plan
- Spaced repetition module for revising formulas/concepts (simple interval-based flashcard resurfacing)
- "Revise later" bookmark queue

### 5. Free Resource Hub
- Central library page aggregating: official previous year papers, free YouTube playlists, formula PDFs
- Optional: community-submitted resources with an admin moderation/approval step

### 6. Community (optional, phase 2)
- Topic-wise doubt forum
- Study streaks and badges (gamification for consistency)

## Database Schema (starting point — refine as needed)

Tables: `users`, `sections`, `topics`, `subtopics`, `notes`, `resources`, `videos`, `questions`, `question_attempts`, `mock_tests`, `mock_test_attempts`, `study_plans`, `bookmarks`

## Design Requirements

- Clean, distraction-free UI — this is a study tool, not a marketing site
- Mobile-responsive (many users will practice on phones)
- Fast page loads — content-heavy but should feel lightweight
- Accessible color contrast, readable typography for long study sessions

## Build Order (suggested phasing)

1. **Phase 1 (MVP):** Auth + Syllabus tree + Notes/Video/Resource pages + Topic-wise practice
2. **Phase 2:** Mock tests + Analytics dashboard
3. **Phase 3:** Study planner + Spaced repetition + Bookmarks
4. **Phase 4:** Community features + Gamification

## Instructions for the AI coding tool

- Start with Phase 1 only. Scaffold the project, set up Supabase tables, and build the syllabus browsing + notes/video/resource display flow first.
- Ask me for Supabase credentials/project setup before writing backend integration code.
- Use placeholder/sample data (3–4 topics fully populated) so the UI can be tested before real content is added.
- Keep components modular so content (notes, videos, resources) can later be managed via the admin panel instead of hardcoded.

---

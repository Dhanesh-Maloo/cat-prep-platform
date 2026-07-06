import { Link } from 'react-router-dom'

const SECTIONAL_TARGETS = [
  { section: 'VARC', range: '42-48', note: 'CAT 2025: a 99th-percentile VARC score was around 44 out of ~72 raw marks.' },
  { section: 'DILR', range: '32-38', note: 'CAT 2025: a 99th-percentile DILR score was around 29-32 out of ~60 raw marks.' },
  { section: 'QA', range: '33-40', note: 'CAT 2025: a 99th-percentile QA score was around 27-31 out of ~66 raw marks.' },
]

export function PlaybookPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">99th Percentile Playbook</h1>
        <p className="text-gray-600">
          CAT is normalized and relative - the same raw score can land anywhere between the 90th and 99th percentile
          depending on how hard that slot's paper was. Chasing a fixed "number of questions" is the wrong target.
          What separates 99th-percentile scorers isn't attempting more, it's a small set of decisions repeated
          consistently: which questions to skip, how time is spent per section, and whether mistakes actually get
          reviewed. This page collects those decisions in one place, based on recent CAT score-vs-percentile data and
          strategies repeatedly cited by 99+ percentile scorers.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">What 99th percentile actually requires</h2>
        <p className="text-sm text-gray-500 mb-4">
          Sectional scores needed for a 99th percentile shift every year with paper difficulty and the normalization
          process, so treat these as a directional target, not a fixed cutoff - recent years have needed a total
          scaled score of roughly 85-86 out of 100+ for 99+ overall.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SECTIONAL_TARGETS.map((t) => (
            <div key={t.section} className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-1">{t.section}</h3>
              <p className="text-2xl font-semibold text-indigo-600 mb-1">{t.range}</p>
              <p className="text-xs text-gray-500">{t.note}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          The practical implication: you do not need to attempt every question in any section. You need very high
          accuracy on a smaller, well-chosen set of attempts.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">DILR: pick 2-3 sets, not all 4</h2>
        <p className="text-gray-700 mb-3">
          The single most repeated piece of advice from 99th-percentile scorers for DILR is that they never attempt
          every set. A typical DILR slot has 4-5 sets of 4-6 questions each. Trying to touch all of them under time
          pressure is what causes most candidates to finish with low accuracy across the board.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
          <li>Spend the first 5-6 minutes scanning every set before solving anything. Do not start with the first set you see.</li>
          <li>Count the constraints in each set. Sets with 2-3 clean constraints (a simple seating arrangement, a table with a few missing values, a straightforward selection-with-conditions) are usually faster than they look.</li>
          <li>Sets with many interlocking conditions, unusual graph types, or ambiguous wording are the ones toppers skip first, even if they look "solvable."</li>
          <li>Budget about 10-12 minutes per chosen set. If you are stuck for more than 6 minutes with no real progress, that set was a wrong pick - move on rather than sinking more time.</li>
          <li>Target 2-3 fully solved sets with 90%+ accuracy over 4 partially-attempted sets with scattered errors. Accuracy has a bigger effect on your DILR percentile than raw attempts.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Section-by-section time allocation</h2>
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-1">VARC (40 minutes, ~24 questions)</h3>
            <p className="text-sm text-gray-600">
              Read RC passages for the argument, not for exhaustive detail - most questions test whether you followed
              the author's position, not whether you memorized every fact. Attempt Para Summary and Para Jumbles early
              since they are typically faster than RC-based inference questions. Do not spend more than 90 seconds
              deciding on a single VARC MCQ; if two options both look defensible after that, mark for review and move on.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-1">DILR (40 minutes, ~20 questions)</h3>
            <p className="text-sm text-gray-600">
              Use the first 5-6 minutes to scan all sets and rank them by constraint count (see above). Do not open a
              new set "just to check" once you've committed - that's how 40 minutes disappears with nothing finished.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-1">QA (40 minutes, ~22 questions)</h3>
            <p className="text-sm text-gray-600">
              Do one full pass attempting only questions you can solve in under 60 seconds - Arithmetic and Number
              System questions are usually the fastest. Come back for Geometry, Modern Math, and multi-step Algebra
              in a second pass once the quick points are banked.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Accuracy over attempts</h2>
        <p className="text-gray-700 text-sm">
          CAT's negative marking (-1 for a wrong MCQ, no penalty for TITA) means a wrong guess costs more than an
          unattempted question in expected value unless you can eliminate at least two of the four options. At the
          99th-percentile level this shows up as candidates attempting fewer questions than average but converting
          85-95% of what they attempt, rather than attempting everything and converting 60-70%.
        </p>
      </section>

      <section className="bg-indigo-50 border border-indigo-100 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">The habit that compounds: an error log</h2>
        <p className="text-gray-700 text-sm mb-3">
          Across CAT, GMAT, and SAT prep communities, the most consistently cited difference between candidates who
          plateau and candidates who break into the 99th percentile is whether they actually review their mistakes.
          Re-attempting a mock without reviewing what went wrong means repeating the same errors at the same rate.
          This platform's <Link to="/mistakes" className="text-indigo-600 hover:underline font-medium">Mistake Notebook</Link> automatically
          collects every question you get wrong across mocks and practice, with the explanation attached, so review
          takes minutes instead of requiring a separate spreadsheet. Aim to go through it at least twice a week.
        </p>
        <Link to="/mistakes" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
          Open your Mistake Notebook →
        </Link>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Quick reference</h2>
        <p className="text-gray-700 text-sm">
          For formulas and shortcuts you should be able to recall instantly under exam pressure, see the{' '}
          <Link to="/formula-sheet" className="text-indigo-600 hover:underline">Formula &amp; Shortcuts Cheat Sheet</Link>.
        </p>
      </section>
    </div>
  )
}

const GROUPS = [
  {
    title: 'Arithmetic',
    items: [
      { name: 'Percentage change', formula: '((New - Old) / Old) x 100' },
      { name: 'Successive percentage change', formula: 'Net change = a + b + (ab / 100), for two successive changes of a% and b%' },
      { name: 'Profit / Loss %', formula: 'Profit% = ((SP - CP) / CP) x 100; SP = CP x (1 + Profit% / 100)' },
      { name: 'Simple Interest', formula: 'SI = (P x R x T) / 100' },
      { name: 'Compound Interest', formula: 'CI = P x (1 + R/100)^T - P' },
      { name: 'Average', formula: 'Average = Sum of values / Number of values' },
      { name: 'Speed, Time, Distance', formula: 'Speed = Distance / Time. Relative speed: same direction |s1 - s2|, opposite direction s1 + s2' },
      { name: 'Time and Work', formula: "If A finishes work in 'a' days, A's one-day rate = 1/a. Combined rate of A and B = 1/a + 1/b" },
      { name: 'Alligation', formula: '(Quantity of cheaper) / (Quantity of dearer) = (Dearer price - Mean price) / (Mean price - Cheaper price)' },
    ],
  },
  {
    title: 'Algebra',
    items: [
      { name: 'Quadratic roots', formula: 'x = (-b +/- sqrt(b^2 - 4ac)) / 2a. Sum of roots = -b/a, Product of roots = c/a' },
      { name: 'Arithmetic Progression (AP)', formula: 'nth term = a + (n-1)d. Sum of n terms = (n/2) x [2a + (n-1)d]' },
      { name: 'Geometric Progression (GP)', formula: 'nth term = a x r^(n-1). Sum of n terms = a(r^n - 1)/(r - 1), r != 1. Sum to infinity = a/(1-r), |r| < 1' },
      { name: 'Logarithm rules', formula: 'log(ab) = log a + log b; log(a/b) = log a - log b; log(a^n) = n x log a; log_b(a) = log(a)/log(b)' },
    ],
  },
  {
    title: 'Number System',
    items: [
      { name: 'Divisibility by 3 / 9', formula: 'Sum of digits divisible by 3 (or 9) means the number is divisible by 3 (or 9)' },
      { name: 'Divisibility by 11', formula: 'Alternating sum of digits (from the right) is divisible by 11' },
      { name: 'LCM and HCF', formula: 'LCM(a, b) x HCF(a, b) = a x b' },
      { name: 'Number of factors', formula: 'If N = p1^e1 x p2^e2 x ..., number of factors = (e1+1)(e2+1)...' },
    ],
  },
  {
    title: 'Geometry & Mensuration',
    items: [
      { name: 'Pythagoras theorem', formula: 'a^2 + b^2 = c^2, for a right triangle with hypotenuse c' },
      { name: "Triangle area (Heron's formula)", formula: 'Area = sqrt(s(s-a)(s-b)(s-c)), where s = (a+b+c)/2' },
      { name: 'Circle', formula: 'Area = pi x r^2. Circumference = 2 x pi x r' },
      { name: 'Cylinder', formula: 'Volume = pi x r^2 x h. Curved surface area = 2 x pi x r x h' },
      { name: 'Sphere', formula: 'Volume = (4/3) x pi x r^3. Surface area = 4 x pi x r^2' },
      { name: 'Cone', formula: 'Volume = (1/3) x pi x r^2 x h' },
    ],
  },
  {
    title: 'Modern Math',
    items: [
      { name: 'Permutations', formula: 'nPr = n! / (n-r)! - arrangements where order matters' },
      { name: 'Combinations', formula: 'nCr = n! / (r! x (n-r)!) - selections where order does not matter' },
      { name: 'Probability', formula: 'P(event) = Favorable outcomes / Total outcomes' },
      { name: 'Two-set Venn diagram', formula: '|A union B| = |A| + |B| - |A intersect B|' },
      { name: 'Three-set Venn diagram', formula: '|A union B union C| = |A|+|B|+|C| - |A intersect B| - |B intersect C| - |A intersect C| + |A intersect B intersect C|' },
    ],
  },
  {
    title: 'DILR shortcuts',
    items: [
      { name: 'Set selection', formula: 'Scan all sets for 5-6 minutes first. Prefer sets with 2-3 constraints. Budget ~10-12 minutes per chosen set.' },
      { name: 'Table / caselet with missing values', formula: 'Fill in every derivable value in the table before answering any question - most questions reuse the same filled-in data.' },
      { name: 'Circular / seating arrangements', formula: 'Fix the most constrained person or position first (an extreme end or a person mentioned in multiple clues) before placing the rest.' },
    ],
  },
  {
    title: 'VARC strategy shortcuts',
    items: [
      { name: 'RC main idea', formula: "The main idea is the author's central claim across the whole passage, not a summary of the first paragraph or the most-repeated word." },
      { name: 'Para jumble opener', formula: 'The opening sentence introduces a subject or general claim and never starts with a pronoun ("this", "it") or a contrast word ("however") that needs prior context.' },
      { name: 'Tone questions', formula: 'Extreme-language options ("always", "completely", "outraged") are usually wrong - CAT passages are rarely absolute in tone.' },
      { name: 'Odd sentence out / summary', formula: 'Identify the shared topic across all sentences first, then find the one sentence that shifts subject or breaks the logical chain.' },
    ],
  },
]

export function FormulaSheetPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Formula &amp; Shortcuts Cheat Sheet</h1>
      <p className="text-gray-500 text-sm mb-6">
        A condensed, exam-day reference across QA, DILR, and VARC - the things you should be able to recall instantly
        without re-deriving them. For worked examples and practice, open the relevant sub-topic from the{' '}
        <a href="/syllabus" className="text-indigo-600 hover:underline">Syllabus</a>.
      </p>
      <div className="space-y-6">
        {GROUPS.map((group) => (
          <section key={group.title} className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="font-semibold text-gray-800 mb-3">{group.title}</h2>
            <dl className="space-y-3">
              {group.items.map((item) => (
                <div key={item.name}>
                  <dt className="text-sm font-medium text-gray-800">{item.name}</dt>
                  <dd className="text-sm text-gray-600">{item.formula}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  )
}

/** Numbered step cards ("How it works"): red disc, title, text. The numbers carry the order. */
export function StepList({ steps, onGray = false }: { steps: { title: string; text: string }[]; onGray?: boolean }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        // Cards use a grey ground on white sections, or white on grey sections — never both a border and a ground.
        <li key={step.title} className={`rounded-lg p-6 ${onGray ? "bg-white" : "bg-gray-50"}`}>
          <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-red-600 font-bold text-white">
            {index + 1}
          </span>
          <h3 className="mt-5 text-h3 font-bold">{step.title}</h3>
          <p className="mt-2 text-gray-600">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

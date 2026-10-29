/**
 * Side-by-side comparison as two columns (stacked on phones), instead of a wide table:
 * no horizontal scrolling at any width or at 200% zoom. Each column repeats the row labels.
 */
export function CompareColumns({ columns, rows }: { columns: [string, string]; rows: [string, string, string][] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {columns.map((column, columnIndex) => (
        <section key={column} aria-label={column} className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="text-h3 font-bold">{column}</h3>
          <dl className="mt-4 divide-y divide-gray-200">
            {rows.map((row) => (
              <div key={row[0]} className="py-4">
                <dt className="text-small font-bold text-gray-600">{row[0]}</dt>
                <dd className="mt-1 text-gray-700">{row[columnIndex + 1]}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}

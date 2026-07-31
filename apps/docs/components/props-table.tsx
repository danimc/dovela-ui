export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

// ponytail: rows are authored by hand next to each component page. Swap in
// react-docgen-typescript generation once there are more than ~10 components.
export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-md border border-border-subtle">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-surface text-fg-muted">
          <tr>
            <th className="px-4 py-2 font-medium">Prop</th>
            <th className="px-4 py-2 font-medium">Type</th>
            <th className="px-4 py-2 font-medium">Default</th>
            <th className="px-4 py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-border-subtle">
              <td className="px-4 py-2 font-mono text-xs">{row.name}</td>
              <td className="px-4 py-2 font-mono text-xs text-fg-muted">
                {row.type}
              </td>
              <td className="px-4 py-2 font-mono text-xs text-fg-muted">
                {row.default ?? "—"}
              </td>
              <td className="px-4 py-2">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

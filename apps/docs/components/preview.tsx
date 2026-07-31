import type { ReactNode } from "react";
import { CodeBlock } from "./code-block";

/**
 * Live example + its source. The preview renders real JSX (imported from
 * @my-ui/react), the snippet is passed as a string.
 *
 * ponytail: the string is hand-kept in sync with the JSX. Wire up a
 * `.source.tsx` loader only if drift actually bites.
 */
export function Preview({
  children,
  code,
}: {
  children: ReactNode;
  code: string;
}) {
  return (
    <div className="my-6">
      <div className="flex flex-wrap items-center gap-3 rounded-md border border-border-subtle bg-bg p-6">
        {children}
      </div>
      <CodeBlock code={code} />
    </div>
  );
}

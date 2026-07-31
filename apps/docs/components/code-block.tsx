"use client";

import { useState } from "react";

// ponytail: no syntax highlighting. Add a Shiki MDX plugin when the snippets
// outgrow ~10 lines; a monospace block reads fine until then.
export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-4">
      <pre className="overflow-x-auto rounded-md border border-border-subtle bg-surface p-4 font-mono text-sm">
        <code>{code.trim()}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute top-2 right-2 rounded-sm border border-border-subtle bg-bg px-2 py-1 text-xs text-fg-muted hover:text-fg"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

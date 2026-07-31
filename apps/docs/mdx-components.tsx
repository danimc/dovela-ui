import type { MDXComponents } from "mdx/types";

// Typography for MDX pages, so component pages stay free of class soup.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="mb-2 text-3xl font-semibold" {...props} />,
    h2: (props) => (
      <h2 className="mt-10 mb-3 text-xl font-semibold" {...props} />
    ),
    h3: (props) => <h3 className="mt-6 mb-2 text-lg font-medium" {...props} />,
    p: (props) => <p className="my-3 leading-7 text-fg-muted" {...props} />,
    ul: (props) => (
      <ul className="my-3 list-disc pl-6 text-fg-muted" {...props} />
    ),
    li: (props) => <li className="my-1" {...props} />,
    a: (props) => <a className="text-accent underline" {...props} />,
    code: (props) => (
      <code
        className="rounded-sm bg-surface px-1 py-0.5 font-mono text-sm"
        {...props}
      />
    ),
    ...components,
  };
}

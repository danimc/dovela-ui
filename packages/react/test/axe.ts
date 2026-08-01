import axe, { type ElementContext, type RunOptions } from "axe-core";

/**
 * Thin wrapper over axe-core. Replaces `vitest-axe`, which is a pre-release
 * pinned to vitest 3's pretty-format and fails to resolve in browser mode.
 * Ten lines here beat a dependency that dictates our test runner version.
 */
export async function expectNoViolations(
  context: ElementContext,
  // Defaulted rather than optional: passing `RunOptions | undefined` makes
  // axe.run resolve to its callback overload, which returns void.
  options: RunOptions = {},
): Promise<void> {
  const { violations } = await axe.run(context, options);
  if (violations.length === 0) return;

  const report = violations
    .map((v) => {
      const nodes = v.nodes.map((n) => `      ${n.html}`).join("\n");
      return `  [${v.impact ?? "unknown"}] ${v.id}: ${v.help}\n    ${v.helpUrl}\n${nodes}`;
    })
    .join("\n\n");

  throw new Error(
    `${violations.length} accessibility violation(s):\n\n${report}\n`,
  );
}

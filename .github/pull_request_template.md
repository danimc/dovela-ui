<!-- PRs target `dev`. Only release promotions and hotfixes target `main`. -->

## What and why

<!-- One paragraph. What changes, and what problem it solves. -->

## Checklist

- [ ] `pnpm changeset` added, or this change is invisible to consumers
- [ ] `pnpm test` green — including the Chromium project, not just jsdom
- [ ] `pnpm typecheck` green
- [ ] New or changed colours ran through `contrast.test.ts`
- [ ] New component: `index.tsx`, `styles.ts`, `types.ts`, a test, and a docs page
- [ ] Docs page updated if props or behaviour changed

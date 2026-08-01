# Dovela UI — working notes

Read [DESIGN.md](./DESIGN.md) before changing tokens or adding a component.
It holds the thesis, roadmap, API conventions and open questions. This file is
just orientation.

## What this is

An accessible React component library betting on the components that are hard —
combo boxes, date pickers, tables with selection — not on another button. Built
on React Aria Components + Tailwind v4 + tailwind-variants.

## State

- Published: `@dovela-ui/react` and `@dovela-ui/core` at `0.1.0`.
- Components: `Button`, `Input`, `Card`. Nothing else yet, deliberately.
- Palette: "Cantera" — warm limestone, burnt ochre. Committed, not yet published.
- Docs site: `apps/docs`, not deployed anywhere yet.
- Publishing: npm trusted publishing (OIDC). **No NPM_TOKEN exists and none
  should be created.** Both packages have `danimc/dovela-ui` + `release.yml`
  registered as trusted publisher. The OIDC path has never actually run — the
  first release after 0.1.0 exercises it for real.

## Hard rules

- **The contrast contract is not negotiable.** `packages/core/src/contrast.test.ts`
  parses `tokens.css` and enforces AAA (7:1) for text, AA (3:1) for non-text UI,
  in both modes. Never hand-tune a colour without running it.
- **Never `opacity` for disabled states.** Use the `disabled-bg` / `disabled-fg`
  token pair. Opacity shifts hue on a warm accent and drops text below 3:1.
- **Follow React Aria prop names** — `isDisabled`, `onPress`, `onChange(value)`.
  Do not invent DOM-flavoured aliases.
- **Compound components export both forms** (`Card.Header` and `CardHeader`).
  Dot notation does not survive the RSC boundary.
- **Every component ships with an axe test.** It is the one claim the library
  makes.

## Commands

```bash
pnpm dev          # tsup --watch + docs :3000 + playground :3001
pnpm test         # vitest: contrast + component + axe
pnpm typecheck
pnpm build
pnpm changeset    # required for any user-facing change
```

`pnpm lint` is currently a no-op — no linter is installed. Do not treat a green
lint as meaningful.

## Gotchas that have already cost time

- **Never run `pnpm build` while `next start` is serving.** The build replaces
  `.next` underneath it and the running server serves asset hashes that no
  longer exist — the page loads with no CSS and stale content. Rebuild, then
  restart.
- **`tsup`'s `treeshake` strips the `"use client"` banner** (it routes output
  through rollup). It is off on purpose in `packages/react/tsup.config.ts`.
- **Node must track the 22 line, not a pin.** `npm@latest` (12.x) needs
  Node >= 22.22.2, so pinning 22.14.0 breaks the OIDC publish step.
- **`git filter-branch -- --all` rewrites `refs/remotes/origin/*` too**, which
  makes the next `--force-with-lease` abort on stale info. `git fetch origin`
  first.

## Branching

**`dev` is the default branch and the target for every PR.** `main` is
released code. Merging to `main` does not publish — it opens a "Version
Packages" PR, and merging that one publishes. Full runbook in
[docs/RELEASING.md](./docs/RELEASING.md).

Never commit straight to `main`. Never push to either long-lived branch
without a PR unless it is a trivial docs fix on `dev`.

## Workflow across sessions

Work is tracked as GitHub issues in `danimc/dovela-ui`. Start a session by
naming the issue; keep one session per component or per decision rather than
one long thread. Record decisions in DESIGN.md, not in chat.

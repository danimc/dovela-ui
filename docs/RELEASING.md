# Branching and releases

Trunk-based with two long-lived branches. Adapted from the doctrine in
ADR-015 (Conomi), with the parts that only apply to app-store builds removed.

## Branches

| Branch | Role | Protected |
| --- | --- | --- |
| `dev` | Integration. Default branch, default PR target. | no force push, no delete |
| `main` | Released. Whatever is here is what npm has, or is about to. | PR required, linear history, no force push, no delete |

Feature branches follow `feat/<slug>`, `fix/<slug>`, `chore/<slug>`,
`docs/<slug>`, `refactor/<slug>`, `hotfix/<slug>`.

No `release/*` branches. A release is a tag, not a branch.

## Normal flow

```
feat/combobox  ──PR──▶  dev  ──PR──▶  main  ──▶  "Version Packages" PR  ──▶  npm
```

1. Branch off `dev`. Work. Add a changeset (`pnpm changeset`) for anything
   user-facing — no changeset means no release note and no version bump.
2. PR into `dev`. CI must be green. **Squash merge.**
3. When `dev` holds a release worth cutting, open a PR `dev → main`.
4. Merging to `main` does **not** publish. The Release workflow opens a
   "Version Packages" PR that applies every pending changeset, bumps versions
   and writes the changelogs.
5. Merging *that* PR publishes to npm and pushes the git tags.

Step 5 is the deliberate gate. A merge to `main` is a decision to prepare a
release; merging the version PR is the decision to ship it. Nothing reaches
npm as a side effect.

## Publishing

Authentication is npm **trusted publishing (OIDC)**. There is no `NPM_TOKEN`
in this repository and none should be created — npm is deprecating direct
publishing from 2FA-bypass tokens around January 2027.

Both packages have `danimc/dovela-ui` + `release.yml` registered as their
trusted publisher on npmjs.com. If that registration is wrong, publishing
fails with a bare `E404` that says nothing about the real cause. Check the
workflow filename first: npm wants `release.yml`, not the full path.

Publishing over OIDC from a public repo also generates provenance
attestations automatically.

## Promotion criteria: `dev → main`

- CI green on `dev`.
- Every user-facing change since the last release carries a changeset.
- The docs site builds and the component pages render (`pnpm build`).
- Nothing half-finished behind a flag that a consumer could reach.

## Hotfix flow

For a bug already published, when `dev` contains work that is not ready.

1. Branch off the release tag: `git checkout -b hotfix/<slug> @dovela-ui/react@X.Y.Z`
2. Minimal fix, a regression test that fails without it, and a patch changeset.
3. PR into `main`. **Do not squash** — the individual commit needs to survive
   so the cherry-pick to `dev` stays clean.
4. Merge, then merge the resulting version PR to publish.
5. Cherry-pick the fix back to `dev` so the branches do not diverge.

## Versioning

SemVer, driven entirely by Changesets. Nobody edits a `version` field by hand.

- `patch` — bug fix, no API change.
- `minor` — new component, new prop, new token.
- `major` — removed or renamed export, changed default, changed prop name.

Pre-1.0 the library is allowed to break on `minor`, but say so loudly in the
changeset. After 1.0, a rename is a `major`, no exceptions.

## What is not automated, on purpose

- **No auto-merge of the version PR.** Look at the changelog before it ships.
- **No release from `dev`.** `release.yml` only runs on `main`.
- **No `lint` gate.** `pnpm lint` is currently a no-op — no linter is
  installed. Do not read a green run as meaningful until that changes.

# @dovela-ui/react

## 0.2.0

### Minor Changes

- ba52f82: Adopt the "Cantera" palette and enforce a contrast contract.

  Colours are now warm limestone neutrals with a burnt-ochre accent, and every
  pair a user sees is verified against WCAG AAA (7:1) for text and AA (3:1) for
  non-text UI, in both modes, by a test that parses `tokens.css`.

  Two accessibility fixes fall out of it: disabled states use a dedicated colour
  pair instead of `opacity` (fading a warm accent shifted its hue and dropped the
  label below 3:1), and field borders use `border-strong` so the control's edge
  meets 1.4.11.

### Patch Changes

- e74f513: Test the accessibility claim in a real browser.

  Component tests now run in two projects: jsdom for rendering and wiring, and
  Chromium for anything jsdom cannot honestly verify. In the browser project axe
  runs with no rules disabled — including `color-contrast`, which is inert under
  jsdom because nothing has computed styles — and focus rings and tab order are
  asserted against real layout.

  Drops `vitest-axe`, a pre-release pinned to vitest 3's pretty-format that does
  not resolve in browser mode, in favour of a small wrapper over `axe-core`.

- Updated dependencies [ba52f82]
  - @dovela-ui/core@0.2.0

## 0.1.0

### Minor Changes

- 328696c: Initial release: design tokens, `Button`, `Input` and `Card`.

### Patch Changes

- Updated dependencies [328696c]
  - @dovela-ui/core@0.1.0

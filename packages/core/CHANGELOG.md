# @dovela-ui/core

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

## 0.1.0

### Minor Changes

- 328696c: Initial release: design tokens, `Button`, `Input` and `Card`.

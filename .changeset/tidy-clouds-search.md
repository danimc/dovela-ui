---
"@dovela-ui/react": patch
---

Test the accessibility claim in a real browser.

Component tests now run in two projects: jsdom for rendering and wiring, and
Chromium for anything jsdom cannot honestly verify. In the browser project axe
runs with no rules disabled — including `color-contrast`, which is inert under
jsdom because nothing has computed styles — and focus rings and tab order are
asserted against real layout.

Drops `vitest-axe`, a pre-release pinned to vitest 3's pretty-format that does
not resolve in browser mode, in favour of a small wrapper over `axe-core`.

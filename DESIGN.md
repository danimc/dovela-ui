# Dovela UI — design definition

The decisions that are expensive to change. Read this before adding a
component; if a change contradicts something here, change this file first.

## What this is

**A React component library for the components that are actually hard.**

Buttons and cards are table stakes — every library has them and none of them
compete on it. The bet here is on the components people genuinely suffer with:
combo boxes, date pickers, tables with selection, dialogs that manage focus
correctly. React Aria does the behavioural work that a weekend clone cannot
replicate, and this library is the styled, documented, tested surface on top.

**What this is not:**

- Not a general-purpose set racing Chakra or Mantine to 60 components.
- Not a headless library — React Aria already exists and is better at it.
- Not a shadcn clone. The recipes CLI may come later; the npm package is the
  product.

## The contrast contract

The differentiator that is verifiable rather than aspirational:

> Every colour pair a user sees meets **WCAG 2.1 AAA (7:1)** for text and
> **AA (3:1)** for non-text UI, in both light and dark mode.

"Accessible" is a claim every library makes. This one is measurable, and
[`packages/core/src/contrast.test.ts`](./packages/core/src/contrast.test.ts)
fails CI when it breaks. It parses `tokens.css` directly, so the palette cannot
drift from the promise.

Consequences worth knowing before you touch a colour:

- **Light mode caps accent chroma at 0.10.** A more saturated ochre has *no*
  lightness that reaches 7:1 while staying in sRGB gamut. This is arithmetic,
  not taste.
- **Dark mode forces light accents.** Reaching 7:1 against a dark background
  means the accent must be pale. A deep, moody accent on dark is not available
  to us. Open question — see below.
- **Disabled is a colour pair, never `opacity`.** Fading a warm accent shifts
  its hue, so it reads as a different colour rather than as inactive, and the
  label drops below 3:1. `--dovela-color-disabled-bg` / `-fg` exist for this.
- **Field borders use `border-strong`.** The edge of an input is what identifies
  the control (WCAG 1.4.11), so the decorative hairline is not enough.

## Visual identity — "Cantera"

Warm limestone neutrals, burnt-ochre accent, near-square corners. Material and
cut rather than soft and rounded — the name is a wedge of stone, and the surface
should feel like one.

Not chosen: cool blue-grey neutrals (every React library lives there), large
radii (reads as generic SaaS), and the high-contrast monochrome look (beautiful,
but competing with Vercel's design language for attention is unwinnable).

Typography: **undecided**. Still on `system-ui`, which is the single biggest
remaining gap in the identity. The decision is to self-host a real face via
fontsource — no Google Fonts calls, no network dependency, no privacy footnote.

## Component roadmap

| Tier | Components | Why |
| --- | --- | --- |
| **Shipped** | `Button`, `Input`, `Card` | Table stakes. Prove the architecture. |
| **Next — the hook** | `ComboBox`, `Select`, `Dialog`, `Toast` | Where React Aria earns its keep and clones fall over. |
| **Then** | `DatePicker`, `Table` (selection + sort), `Menu`, `Popover`, `Tooltip` | The headline components. `DatePicker` is the one worth being known for. |
| **Filler** | `Checkbox`, `Radio`, `Switch`, `NumberField`, `SearchField`, `Tabs` | Needed for real apps, cheap once conventions are set. |

Ship depth over breadth: one `ComboBox` with async loading, virtualisation and
a documented keyboard contract beats six more one-line wrappers.

## API conventions

Locked in, because changing them after 20 components costs a major version.

- **Follow React Aria's prop names.** `isDisabled`, `isInvalid`, `isRequired`,
  `onPress`, `onChange(value)` — not `disabled`, not `onClick`, not
  `onChange(event)`. Consistency with the underlying library beats familiarity
  with the DOM.
- **Sizes are `sm` / `md` / `lg`**, `md` default. No `xs`, no `xl` until a real
  need shows up.
- **Action variants are `solid` / `outline` / `ghost`**, `solid` default.
- **`className` merges over variant classes** via tailwind-variants, so consumer
  conflicts resolve in the consumer's favour.
- **Every component is `forwardRef`.** Peer dep is React >= 18, so the React 19
  ref-as-prop shortcut is not available.
- **File layout is fixed**: `index.tsx`, `styles.ts`, `types.ts`,
  `<name>.test.tsx`. Styles never live in the component file.
- **Compound components export both forms.** `Card.Header` and `CardHeader` —
  dot notation does not survive the RSC boundary, so the flat export is not
  optional. See the Card docs page.
- **No component ships without an axe test.** It is the one thing the library
  claims; it gets a test, not a promise.

## Open questions

- **Dark-mode accent.** AAA forces it pale. Options: accept it, keep solid
  buttons neutral on dark and use the accent only for text and focus, or relax
  dark mode to AA (4.5:1) and document the asymmetry.
- **Typeface.** Which face, and whether headings get a second one.
- **Recipes CLI.** Deferred until the catalogue is worth copying from.

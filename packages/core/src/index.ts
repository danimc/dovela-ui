/**
 * Token registry — the CSS custom properties declared in `tokens.css`.
 * Consumed by the docs site (tokens table) and available to apps that need
 * a token value in JS (`var(${tokens.color.accent})`).
 *
 * ponytail: hand-maintained, single source of truth is still the CSS file.
 * Generate it from the CSS only if the list outgrows a screen.
 */
export const tokens = {
  color: {
    bg: "--dovela-color-bg",
    surface: "--dovela-color-surface",
    border: "--dovela-color-border",
    borderStrong: "--dovela-color-border-strong",
    fg: "--dovela-color-fg",
    fgMuted: "--dovela-color-fg-muted",
    accent: "--dovela-color-accent",
    accentHover: "--dovela-color-accent-hover",
    accentFg: "--dovela-color-accent-fg",
    danger: "--dovela-color-danger",
    dangerFg: "--dovela-color-danger-fg",
    ring: "--dovela-color-ring",
  },
  radius: {
    sm: "--dovela-radius-sm",
    md: "--dovela-radius-md",
    lg: "--dovela-radius-lg",
    xl: "--dovela-radius-xl",
    full: "--dovela-radius-full",
  },
  spacing: { base: "--dovela-spacing" },
  shadow: {
    sm: "--dovela-shadow-sm",
    md: "--dovela-shadow-md",
    lg: "--dovela-shadow-lg",
  },
  typography: {
    fontSans: "--dovela-font-sans",
    fontMono: "--dovela-font-mono",
    xs: "--dovela-text-xs",
    sm: "--dovela-text-sm",
    base: "--dovela-text-base",
    lg: "--dovela-text-lg",
    xl: "--dovela-text-xl",
  },
} as const;

export type Tokens = typeof tokens;

/** `cssVar(tokens.color.accent)` → `"var(--dovela-color-accent)"` */
export const cssVar = (token: string) => `var(${token})`;

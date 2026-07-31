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
    bg: "--my-ui-color-bg",
    surface: "--my-ui-color-surface",
    border: "--my-ui-color-border",
    borderStrong: "--my-ui-color-border-strong",
    fg: "--my-ui-color-fg",
    fgMuted: "--my-ui-color-fg-muted",
    accent: "--my-ui-color-accent",
    accentHover: "--my-ui-color-accent-hover",
    accentFg: "--my-ui-color-accent-fg",
    danger: "--my-ui-color-danger",
    dangerFg: "--my-ui-color-danger-fg",
    ring: "--my-ui-color-ring",
  },
  radius: {
    sm: "--my-ui-radius-sm",
    md: "--my-ui-radius-md",
    lg: "--my-ui-radius-lg",
    xl: "--my-ui-radius-xl",
    full: "--my-ui-radius-full",
  },
  spacing: { base: "--my-ui-spacing" },
  shadow: {
    sm: "--my-ui-shadow-sm",
    md: "--my-ui-shadow-md",
    lg: "--my-ui-shadow-lg",
  },
  typography: {
    fontSans: "--my-ui-font-sans",
    fontMono: "--my-ui-font-mono",
    xs: "--my-ui-text-xs",
    sm: "--my-ui-text-sm",
    base: "--my-ui-text-base",
    lg: "--my-ui-text-lg",
    xl: "--my-ui-text-xl",
  },
} as const;

export type Tokens = typeof tokens;

/** `cssVar(tokens.color.accent)` → `"var(--my-ui-color-accent)"` */
export const cssVar = (token: string) => `var(${token})`;

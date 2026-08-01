import "@testing-library/jest-dom/vitest";
// Real compiled Tailwind + tokens. This import is the whole reason browser
// tests can assert contrast at all.
import "./test/styles.css";

// The page itself must carry the theme background, or every element is
// measured against a default white canvas and the dark-mode run is a lie.
document.documentElement.style.background = "var(--dovela-color-bg)";
document.documentElement.style.color = "var(--dovela-color-fg)";

import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "my-ui — accessible React components",
  description:
    "An accessible React component library built on React Aria Components and Tailwind CSS.",
};

const NAV = [
  { href: "/components/button", label: "Button" },
  { href: "/components/input", label: "Input" },
  { href: "/components/card", label: "Card" },
];

// Runs before paint so a dark-mode reload doesn't flash white.
const THEME_SCRIPT = `try{var t=localStorage.getItem("my-ui-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen">
        <header className="border-b border-border-subtle">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold">
              my-ui
            </Link>
            <nav className="flex items-center gap-5 text-sm">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-fg-muted hover:text-fg"
                >
                  {item.label}
                </Link>
              ))}
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-6 py-12">{children}</main>
      </body>
    </html>
  );
}

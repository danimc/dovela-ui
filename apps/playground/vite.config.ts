import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Hit the component source directly — instant HMR, no tsup watch needed.
    alias: { "@dovela/react": new URL("../../packages/react/src", import.meta.url).pathname },
  },
});

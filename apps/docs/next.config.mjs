import createMDX from "@next/mdx";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
export default withMDX({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Workspace packages ship untranspiled-for-npm output; let Next compile them.
  // `pnpm dev` runs tsup --watch alongside, so edits in packages/react reload here.
  transpilePackages: ["@my-ui/react", "@my-ui/core"],
});

import type { NextConfig } from "next";

// GitHub Pages serves a project site from https://<user>.github.io/<repo>, so the
// app needs to know that prefix at build time. The deploy workflow sets
// NEXT_PUBLIC_BASE_PATH; locally it is empty so `npm run dev` still works at /.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Emit a fully static site to ./out — no Node server needed to host it.
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  // Pages has no image optimisation server.
  images: { unoptimized: true },
  // Serve /projects/foo/ as a directory with index.html, which is how Pages
  // resolves nested routes without a rewrite layer.
  trailingSlash: true,
};

export default nextConfig;

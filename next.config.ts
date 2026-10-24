import type { NextConfig } from "next";

// Static export for GitHub Pages. BASE_PATH is set by the Pages workflow (e.g. "/restauro-md").
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.BASE_PATH || "",
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH || "",
  },
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;

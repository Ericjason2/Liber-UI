const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  basePath: isGithubPages ? "/Liber-UI" : "",
  assetPrefix: isGithubPages ? "/Liber-UI" : "",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@liber/core", "@liber/react"],
};

export default nextConfig;

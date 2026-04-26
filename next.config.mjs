/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent ESLint warnings/errors from failing the Vercel build.
  // Fix actual lint issues separately; don't let them block deploys.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // Allow any HTTPS image URL (player photos can come from any domain).
      // Restrict this later once you know exactly which domains are used.
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // All site imagery is served from /public — no remote image proxying.
  // Add specific hosts to `images.remotePatterns` if a remote source is
  // ever needed; never re-add the "**" wildcard.
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don't run ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't run TypeScript type checking during production builds
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 
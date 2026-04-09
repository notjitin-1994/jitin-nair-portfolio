/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to support dynamic API routes for Astra Chat
  // Removed distDir to use default .next directory which Vercel expects
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

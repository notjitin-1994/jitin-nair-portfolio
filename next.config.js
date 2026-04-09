/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to support dynamic API routes for Astra Chat
  distDir: 'dist',
  images: {
    unoptimized: true, // Required if you still want to use some static patterns or if Vercel image optimization is not needed
  },
}

module.exports = nextConfig

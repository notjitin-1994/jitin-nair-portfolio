/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/LD-Systems-Portfolio', destination: '/ld', permanent: true },
      { source: '/AI-Systems-Architecture-Portfolio', destination: '/ai', permanent: true },
      { source: '/showcase', destination: '/ld/showcase', permanent: true },
      { source: '/showcase/:path*', destination: '/ld/showcase/:path*', permanent: true },
      { source: '/capabilities', destination: '/ld/capabilities', permanent: true },
      { source: '/work', destination: '/ld/work', permanent: true },
      { source: '/insights', destination: '/ai/insights', permanent: true },
      { source: '/insights/:path*', destination: '/ai/insights/:path*', permanent: true },
      { source: '/projects', destination: '/ai/projects', permanent: true },
      { source: '/projects/:path*', destination: '/ai/projects/:path*', permanent: true },
    ];
  },

  // Enterprise Grade Image Optimization
  images: {
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
    ],
  },
  
  // Enterprise Grade Security & SEO Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-scripts.com https://*.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; media-src 'self' https: blob:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://*.google-analytics.com; frame-ancestors 'none'; upgrade-insecure-requests;",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

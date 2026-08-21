/** @type {import('next').NextConfig} */
const yandexLandingPaths = [
  '/solutions/layered-site-protection',
  '/solutions/low-altitude-radar-monitoring',
  '/solutions/multi-sensor-detection',
  '/solutions/perimeter-defense-system',
  '/solutions/portable-detection-system',
  '/solutions/rf-target-positioning',
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: process.env.NEXT_OUTPUT_MODE === 'standalone' ? 'standalone' : undefined,
  distDir: process.env.NEXT_DIST_DIR || '.next',
  experimental: {
    cpus: 1,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      ...yandexLandingPaths.map((source) => ({
        source,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
          {
            key: 'Cloudflare-CDN-Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      })),
      {
        source: '/:path*\\.(jpg|jpeg|png|webp|avif|gif|svg|ico|mp4|webm|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

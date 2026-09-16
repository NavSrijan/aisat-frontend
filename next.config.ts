import type { NextConfig } from "next";

const TARGET_API_URL = (process.env.NEXT_PUBLIC_LEARNING_SERVICE_URL || 'https://staging-api.sharda.live').replace(/\/+$/, '');
const BACKEND_URL = TARGET_API_URL.includes('sharda.live') && !TARGET_API_URL.endsWith('/learning')
  ? `${TARGET_API_URL}/learning`
  : TARGET_API_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/quiz-delivery/:path*',
        destination: `${BACKEND_URL}/api/quiz-delivery/:path*`,
      },
    ];
  },
};

export default nextConfig;

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: path.resolve(__dirname, '.next/cache/webpack'),
        store: 'pack',
        compression: 'gzip',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        profile: true,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
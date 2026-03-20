import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false, // add this

  experimental: {
    serverActions: { allowedOrigins: ['*'] },
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glb$/,
      type: 'asset/resource',
    });
    // Override PNG handling only for files imported from components (Three.js textures)
    config.module.rules.push({
      test: /\.png$/,
      resourceQuery: { not: [/url/] },
      issuer: /\.(tsx|ts|js|jsx)$/,
      include: /src\/components/,
      type: 'asset/resource',
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
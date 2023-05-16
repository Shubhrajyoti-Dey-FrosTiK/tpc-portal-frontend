/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    runtime: "experimental-edge",
  },
  env: {
    hello: "world",
  },
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;

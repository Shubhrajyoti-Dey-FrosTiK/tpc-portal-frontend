/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    runtime: 'edge',
  },
  env: {
    hello: "world",
  },
  images: {
    remotePatterns: [],
    domains: ['www.iitbhu.ac.in'],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [],
    domains: ["www.iitbhu.ac.in"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = withPWA({
  // next config
  reactStrictMode: true,
  swcMinify: true,
  // compiler: {
  //   removeConsole: true,
  // },
  experimental: {
    runtime: "experimental-edge",
  },
});
module.exports = nextConfig;

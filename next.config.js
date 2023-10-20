/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.PINATA_GATEWAY],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

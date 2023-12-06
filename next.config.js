/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.PINATA_GATEWAY],
  },
};

module.exports = nextConfig;

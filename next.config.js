/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.PINATA_GATEWAY],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;

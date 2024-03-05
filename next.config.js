/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cli.vuejs.org',
      },
    ],
  },
}

module.exports = nextConfig

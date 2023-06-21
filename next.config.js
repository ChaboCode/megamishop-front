/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.MINIO_ENDPOINT,
        port: '9000',
        pathname: '/web/**'
      }
    ],
  },
  publicRuntimeConfig: {
    MINIO_ENDPOINT: process.env.MINIO_ENDPOINT
  },
}

module.exports = nextConfig

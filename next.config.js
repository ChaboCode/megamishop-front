/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', process.env.MINIO_ENDPOINT],
  },
  publicRuntimeConfig: {
    MINIO_ENDPOINT: process.env.MINIO_ENDPOINT
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'localhost', 'megamishop-minio.flycast'],
  },
  publicRuntimeConfig: {
    MINIO_ENDPOINT: process.env.MINIO_ENDPOINT
  },
}

module.exports = nextConfig

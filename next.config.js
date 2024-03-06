// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('./package.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    version
  },
  images: {
    domains: ['reports.karpatkey.com', 'localhost', 'reports.karpatkey.dev']
  },
  experimental: {
    externalDir: true
  }
}

module.exports = nextConfig

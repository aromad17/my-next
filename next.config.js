/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== 'production'
const name = 'my-next'


const nextConfig = {
  reactStrictMode: true,
  assertPrefix: !debug ? `${name}/` : '',
  basePath: '/my-next',
  trailingSlash: true,
}

module.exports = nextConfig

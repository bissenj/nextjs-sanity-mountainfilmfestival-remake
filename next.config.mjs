/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },      
    ],
  },
  experimental: {
    appDir: false,
    scrollRestoration: true,
  },
}

export default config

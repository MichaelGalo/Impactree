/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'impactree-api-k6c8s.ondigitalocean.app',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
 };
 
 export default nextConfig;
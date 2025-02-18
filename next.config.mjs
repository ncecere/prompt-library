/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Enable static optimization
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;

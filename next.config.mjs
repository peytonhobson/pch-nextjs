/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  productionBrowserSourcemaps: false,
  images: {
    remotePatterns: [{
     hostname: 'premier-care-homes.s3.amazonaws.com'
    }],
  }
};

export default nextConfig;

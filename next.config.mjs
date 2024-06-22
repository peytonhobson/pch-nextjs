/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
     hostname: 'premier-care-homes.s3.amazonaws.com'
    }],
  }
};

export default nextConfig;

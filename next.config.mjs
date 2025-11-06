/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        hostname: 'images.pexels.com', 
      },
      {
        hostname: 'images.unsplash.com'
      },
      {
        hostname: 'cdn.dummyjson.com'
      },
      {
        hostname: 'i.dummyjson.com'
      },
      {
        hostname: 'drive.google.com'
      },
      {
        hostname: 'iili.io'
      },
    ],
  },
};

export default nextConfig;

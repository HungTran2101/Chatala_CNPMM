/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  future: { webpack5: true },
  webpack: config => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false };
    return config;
  },
  images: {
    domains: ['icon-library.com', 'localhost', 'res.cloudinary.com'],
  },
  
};

module.exports = nextConfig;

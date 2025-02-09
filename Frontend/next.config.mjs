/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
      {
        protocol: "https",
        hostname: "https://fitness-tracker-3-o8ue.onrender.com",
      },
    ],
  },
};

// Use module.exports instead of ES modules export
export default nextConfig;

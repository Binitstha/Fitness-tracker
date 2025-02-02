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
      ],
    },
  };
  
  // Use module.exports instead of ES modules export
  export default nextConfig;
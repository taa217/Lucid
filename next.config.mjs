/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      config.resolve.fallback = {
        canvas: false, // Ignore the canvas module for the build
      };
      return config;
    },
  };
  
  export default nextConfig;
  

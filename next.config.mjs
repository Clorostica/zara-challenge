/** @type {import('next').NextConfig} */

import "dotenv/config";

const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "prueba-tecnica-api-tienda-moviles.onrender.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;

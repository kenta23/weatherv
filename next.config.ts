import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   dynamicIO: true,
  // },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "openweathermap.org",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "www.dewicats.xyz",
      },
    ],
  },
};

export default nextConfig;

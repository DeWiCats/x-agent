import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.dewicats.xyz",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "zpxvejzhxgkjyabwlssd.supabase.co",
      },
    ],
  },
};

export default nextConfig;

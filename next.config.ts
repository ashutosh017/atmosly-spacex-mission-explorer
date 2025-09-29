import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images:{
    remotePatterns:[new URL("https://images2.imgbox.com/**")]
  }
};

export default nextConfig;

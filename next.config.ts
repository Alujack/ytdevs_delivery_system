import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"), 
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};



export default nextConfig;

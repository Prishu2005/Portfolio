import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow @react-three packages to be transpiled correctly
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;

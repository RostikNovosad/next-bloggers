import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.103", "192.168.0.*", "192.168.1.*"],
  images: { qualities: [75, 90] },
};

export default nextConfig;

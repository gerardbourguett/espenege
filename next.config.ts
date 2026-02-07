import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "api.sofascore.app",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/noticias-insolitas",
        destination: "/no-somos-nada",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

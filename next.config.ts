import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "s.wordpress.com" },
      { protocol: "https", hostname: "s0.wp.com" },
      { protocol: "https", hostname: "iad.microlink.io" },
      { protocol: "https", hostname: "api.microlink.io" },
      { protocol: "https", hostname: "www.softthrive.com" },
      { protocol: "https", hostname: "apps.apple.com" },
      { protocol: "https", hostname: "play.google.com" },
      { protocol: "https", hostname: "is1-ssl.mzstatic.com" },
      { protocol: "https", hostname: "is2-ssl.mzstatic.com" },
      { protocol: "https", hostname: "is3-ssl.mzstatic.com" },
      { protocol: "https", hostname: "is4-ssl.mzstatic.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.simpleicons.org" }
    ]
  }
};

export default nextConfig;

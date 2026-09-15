import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json",
  },
});

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "framagit.org",
        port: "",
        pathname: "/**",
      },
    ],
    qualities: [25, 50, 75, 100],
  },
  turbopack: {
    root: path.join(__dirname),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|ico|woff2|woff)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:locale(en|fa)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/fa/blog/a-linux-distribution-that-leaves-no-one-behind",
        destination: "/fa/blog/parch-accessibility",
        permanent: true,
      },
      {
        source: "/en/blog/parch-accessibility",
        destination: "/en/blog/a-linux-distribution-that-leaves-no-one-behind",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

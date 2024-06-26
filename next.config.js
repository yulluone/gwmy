/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rnlheglxjbccptvxmtxn.supabase.co",
        pathname: "/storage/v1/**",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/product-images/**",
      },
      {
        protocol: "https",
        hostname: "cdn-az.allevents.in",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

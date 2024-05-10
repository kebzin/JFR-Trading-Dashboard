/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ndlmecmfbncfwyyazuwy.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/product-images/product-images/**",
      },
    ],
  },
};

export default nextConfig;

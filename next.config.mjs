/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    DB_URI: "mongodb://localhost:27017/bcmunka",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;

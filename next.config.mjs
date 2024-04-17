/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '175f8cbde885d84d.kinxzone.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  cleanDistDir: true,
};

export default nextConfig;

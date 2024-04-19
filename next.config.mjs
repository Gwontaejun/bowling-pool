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
      {
        protocol: 'https',
        hostname: 'img2.joongna.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shopping-phinf.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'searchad-phinf.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dnvefa72aowie.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  cleanDistDir: true,
  ignoreBuildErrors: true,
};

export default nextConfig;

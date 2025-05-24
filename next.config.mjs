/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['rbasuowvzdxddqlwpejp.supabase.co'],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'isAdmin',
            value: 'false',
          },
        ],
      },
      {
        source: '/profile',
        destination: '/login',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'isAuthenticated',
            value: 'false',
          },
        ],
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig; 
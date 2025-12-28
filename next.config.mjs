import withPWAInit from '@ducanh2912/next-pwa';

const isProd = process.env.NODE_ENV === 'production';

// Helper to generate CSP with environment-specific configuration
// In production: removes unsafe-eval for strict CSP
// In development: keeps unsafe-eval for webpack HMR (hot module replacement)
const getCspValue = () => {
  const isDev = process.env.NODE_ENV === 'development';

  // Production uses strict CSP; development needs eval for HMR
  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'"; // 'unsafe-inline' required for Next.js styled-jsx

  return [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https://images.unsplash.com",
    "connect-src 'self' https://api.protected-text.com https://kv.vercel-storage.com",
    "font-src 'self' https://fonts.gstatic.com",
    'frame-ancestors "none"',
    "base-uri 'self'",
    "form-action 'self'",
    // CSP report-uri for violation monitoring (configure endpoint as needed)
    'report-uri /api/csp-report',
  ].join('; ');
};

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: getCspValue(),
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
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
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()',
  },
];

const nextConfig = {
  // Memory optimization for development
  onDemandEntries: {
    maxInactiveAge: 15 * 1000,
    pagesBufferLength: 3,
  },

  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProd,
});

export default withPWA(nextConfig);

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false, // Enable PWA in development for testing
  fallbacks: {
    document: '/offline.html'
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });

    return config;
  },
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io",
      "oaidalleapiprodscus.blob.core.windows.net",
      "img.clerk.com"
    ]
  }
}

module.exports = withPWA(nextConfig);

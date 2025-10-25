const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
  register: false,
  skipWaiting: false,
  runtimeCaching: require('next-pwa/cache'), // in CJS niente estensione e niente warning
});

module.exports = withPWA({
  reactStrictMode: true,
});

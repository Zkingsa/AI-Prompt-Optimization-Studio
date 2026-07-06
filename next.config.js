/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed: output: 'export'
  // Static export is incompatible with dynamic API routes like /api/api-keys/[id]
};

module.exports = nextConfig;

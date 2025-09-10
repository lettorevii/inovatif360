/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        optimizePackageImports: ['framer-motion', 'gsap', '@heroicons/react']
    }
}

module.exports = nextConfig;

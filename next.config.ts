import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
    reactStrictMode: false,
    experimental: {
        scrollRestoration: true, // Helps with navigation flickering issues
    },
    swcMinify: true, // ✅ Enables better browser compatibility
    webpack: (config) => {
        config.resolve.fallback = { fs: false }; // ✅ Ensures HMR works properly
        return config;
    },
};

export default nextConfig;

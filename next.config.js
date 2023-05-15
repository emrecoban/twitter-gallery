/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.twimg.com',
            },
            {
                protocol: 'https',
                hostname: '**.twitter.com',
            },
        ],
    }
}

module.exports = nextConfig

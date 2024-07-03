import createNextIntlPlugin from "next-intl/plugin";

const withNextInitl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'a.storyblok.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default withNextInitl(nextConfig);

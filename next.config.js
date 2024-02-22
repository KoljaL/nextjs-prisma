/** @type {import('next').NextConfig} */
// const nextConfig = {
//   swcMinify: true
// }
// module.exports = nextConfig

const path = require('path');

const nextConfig = {
    // output: 'export',
    swcMinify: true,
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './'),
        };

        return config;
    },
};

module.exports = nextConfig;

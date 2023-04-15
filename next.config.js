/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	generateEtags: false,
	poweredByHeader: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.dummyjson.com',
				port: '',
				pathname: '/data/products/**',
			},
		],
	},
};

module.exports = nextConfig;

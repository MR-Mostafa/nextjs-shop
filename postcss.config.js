// eslint-disable-next-line import/no-commonjs
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
		...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
	},
};

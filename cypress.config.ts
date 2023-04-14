import { defineConfig } from 'cypress';
import path from 'path';

export default defineConfig({
	component: {
		video: false,
		devServer: {
			framework: 'next',
			bundler: 'webpack',
			webpackConfig: {
				resolve: {
					alias: {
						'@/*': path.resolve(__dirname, './src/*'),
					},
				},
			},
		},
	},
});

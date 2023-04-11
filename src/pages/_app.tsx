import '@/styles/globals.scss';

import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';

import { _OneSecond } from '@/constants';
import MainLayout from '@/layouts/MainLayout';

const interFont = Inter({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	style: ['normal'],
	display: 'swap',
	variable: '--font-inter',
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<title>E-commerce</title>
				<link rel="icon" type="image/png" href="/favicon.png" />
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>

			<style jsx global>{`
				:root {
					--font-roboto: ${interFont.variable};
				}
			`}</style>

			<RecoilRoot>
				<SWRConfig
					value={{
						loadingTimeout: _OneSecond * 15, // 15 seconds
						errorRetryCount: 3,
					}}
				>
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				</SWRConfig>
			</RecoilRoot>
		</>
	);
}

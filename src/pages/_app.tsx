import '@/styles/styles.scss';

import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';

import { _OneSecond } from '@/constants';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

const interFont = Inter({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	style: ['normal'],
	display: 'swap',
	variable: '--font-inter',
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<title>E-commerce</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>

			<style jsx global>{`
				:root {
					--font-inter: ${interFont.variable};
					font-size: 16px;
				}
			`}</style>

			<SessionProvider session={session}>
				<RecoilRoot>
					<SWRConfig
						value={{
							loadingTimeout: _OneSecond * 15, // 15 seconds
							errorRetryCount: 3,
						}}
					>
						<Component {...pageProps} />
					</SWRConfig>
				</RecoilRoot>
			</SessionProvider>
		</>
	);
}

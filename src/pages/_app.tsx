import '@/styles/globals.scss';

import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';

import MainLayout from '@/layouts/MainLayout';

const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	style: ['normal'],
	display: 'swap',
	variable: '--font-roboto',
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style jsx global>{`
				:root {
					--font-roboto: ${roboto.variable};
				}
			`}</style>

			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</>
	);
}

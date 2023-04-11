import { ReactNode } from 'react';

import Header from '@/components/Header';

type TPropsMainLayout = {
	children: ReactNode;
};

function MainLayout({ children }: TPropsMainLayout) {
	return (
		<>
			<Header />
			<main className="w-full p-6">{children}</main>
		</>
	);
}

export default MainLayout;

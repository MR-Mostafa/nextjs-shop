import { ReactNode } from 'react';

import { Header } from '@/features';

type TPropsMainLayout = {
	shouldShowHeader?: boolean;
	children: ReactNode;
};

function MainLayout({ children, shouldShowHeader = true }: TPropsMainLayout) {
	return (
		<>
			{shouldShowHeader && <Header />}
			<main className="w-full p-6">{children}</main>
		</>
	);
}

export default MainLayout;

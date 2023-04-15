import { ReactNode } from 'react';
import cx from 'classnames';

import { Header } from '@/features';

type TPropsMainLayout = {
	shouldShowHeader?: boolean;
	children: ReactNode;
	link?: string;
	title?: ReactNode;
};

function MainLayout({ children, shouldShowHeader = true, link, title }: TPropsMainLayout) {
	return (
		<>
			{shouldShowHeader && <Header link={link!} title={title!} />}
			<main className={cx('w-full', { 'p-6': shouldShowHeader, 'px-6': !shouldShowHeader })}>{children}</main>
		</>
	);
}

export default MainLayout;

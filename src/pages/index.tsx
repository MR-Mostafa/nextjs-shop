import Link from 'next/link';
import { Button } from '@/components';
import MainLayout from '@/layouts/MainLayout';

export default function Home() {
	return (
		<MainLayout
			shouldShowHeader
			link="/"
			title={
				<Button as="a" variant="link" className="text-lg font-bold">
					Index
				</Button>
			}
		>
			<div className="w-full text-center">
				<Link href="/products" passHref legacyBehavior>
					<Button as="a" variant="primary">
						Products Page
					</Button>
				</Link>
			</div>
		</MainLayout>
	);
}

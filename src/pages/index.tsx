import { Star, Button } from '@/components';
import MainLayout from '@/layouts/MainLayout';

export default function Home() {
	return (
		<MainLayout
			shouldShowHeader
			link="/"
			title={
				<Button as="a" variant="link" className="text-2xl font-bold">
					Products
				</Button>
			}
		>
			<div className="w-full">
				<Star rate={5.6} />
			</div>
		</MainLayout>
	);
}

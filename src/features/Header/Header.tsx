import Link from 'next/link';

export const Header = () => {
	return (
		<header className="w-full border-b bg-white p-6">
			<div className="container mx-auto">
				<nav className="flex w-full items-center justify-between">
					<Link href={'/products'} className="text-2xl font-bold">
						Products
					</Link>
					<ul className="flex items-center"></ul>
				</nav>
			</div>
		</header>
	);
};

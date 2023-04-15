import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button, Avatar } from '@/components';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { BsCart, BsSearch } from 'react-icons/bs';

interface HeaderProps {
	link: string;
	title: ReactNode;
}

export const Header = ({ link, title }: HeaderProps) => {
	const router = useRouter();

	const { data: session } = useSession();

	return (
		<header className="w-full border-b bg-white px-6 py-2">
			<div className="container mx-auto">
				<nav className="flex w-full items-center justify-between">
					<Link href={link} passHref legacyBehavior>
						{title}
					</Link>

					<ul className="flex flex-row-reverse items-center [&>li:not(:first-child)]:pe-2">
						<li>
							<Button variant="link" className="p-0">
								<Avatar src={session?.user?.image as string} rootClassName="w-[30px] h-[30px]" />
							</Button>
						</li>

						<li>
							<Button variant="link">
								<BsCart />
							</Button>
						</li>

						<li>
							<Button variant="link">
								<BsSearch />
							</Button>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

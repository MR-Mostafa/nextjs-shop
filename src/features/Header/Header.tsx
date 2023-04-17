import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button, Avatar } from '@/components';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { BsCart, BsSearch } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { addItemInCart } from '@/store';
interface HeaderProps {
	link: string;
	title: ReactNode;
}

export const Header = ({ link, title }: HeaderProps) => {
	const cart = useRecoilValue(addItemInCart);
	const router = useRouter();

	const { data: session } = useSession();

	return (
		<header className="flex h-[72px] w-full flex-col items-center justify-center border-b bg-white px-6 py-2">
			<div className="container mx-auto">
				<nav className="flex w-full items-center justify-between">
					<Link href={link} passHref legacyBehavior>
						{title}
					</Link>

					<ul className="flex flex-row-reverse items-center [&>li:not(:first-child)]:pe-2">
						<li>
							<Button
								variant="link"
								className="p-0"
								onClick={() => {
									if (!session?.user) {
										router.push('/login');
										return;
									}
								}}
							>
								<Avatar src={session?.user?.image as string} rootClassName="w-[34px] h-[34px] border border-stone-300" />
							</Button>
						</li>

						<li>
							<Button
								variant="link"
								className="p-2 text-lg"
								onClick={() => {
									router.push('/cart');
								}}
							>
								{cart.length !== 0 && (
									<span className="absolute -top-px left-0 right-0 mx-auto inline-flex h-[14px] w-[14px] items-center justify-center overflow-hidden rounded-full bg-rose-500 text-[9px] text-white opacity-80">
										{cart.length}
									</span>
								)}

								<BsCart />
							</Button>
						</li>

						<li>
							<Button variant="link" className="p-2 text-lg">
								<BsSearch />
							</Button>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

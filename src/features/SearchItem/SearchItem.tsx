import { Card, ImageWithFallback } from '@/components';
import Link from 'next/link';
import { ProductItem as ProductItemType } from '@/types';
import { shimmer, toBase64 } from '@/utils';
import { useRouter } from 'next/router';
import { ReactNode, memo } from 'react';

interface ProductItemProps {
	children?: ReactNode;
	product: ProductItemType;
	link?: string;
}

export const SearchItem = memo(({ children, product, link }: ProductItemProps) => {
	const router = useRouter();

	return (
		<Card.Wrapper
			className="flex flex-nowrap items-center justify-center"
			onClick={() => {
				if (!link) return;

				router.push(link);
			}}
		>
			<Card.Image className="max-h-[110px] flex-[110px] flex-shrink-0 flex-grow-0">
				{!link ? (
					<ImageWithFallback
						src={product.thumbnail}
						alt={product.title}
						width={110}
						height={110}
						placeholder="blur"
						blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(110, 110))}`}
					/>
				) : (
					<Link href={link}>
						<ImageWithFallback
							src={product.thumbnail}
							alt={product.title}
							width={110}
							height={110}
							placeholder="blur"
							blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(110, 110))}`}
						/>
					</Link>
				)}
			</Card.Image>

			<Card.Body className="flex-auto py-2 pe-1 ps-3 text-left">
				{!link ? (
					<p className="title">{product.title}</p>
				) : (
					<Link href={link} className="title">
						{product.title}
					</Link>
				)}

				<p className="description pb-3">{product.description}</p>

				{children && children}
			</Card.Body>
		</Card.Wrapper>
	);
});

SearchItem.displayName = 'SearchItem';

import { Card, Star, ImageWithFallback } from '@/components';
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

export const ProductItem = memo(({ children, product, link }: ProductItemProps) => {
	const router = useRouter();

	return (
		<Card.Wrapper
			onClick={() => {
				if (!link) return;

				router.push(link);
			}}
		>
			<Card.Image className="max-h-[335px]">
				{!link ? (
					<ImageWithFallback
						src={product.thumbnail}
						alt={product.title}
						width={500}
						height={335}
						placeholder="blur"
						blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 335))}`}
					/>
				) : (
					<Link href={link}>
						<ImageWithFallback
							src={product.thumbnail}
							alt={product.title}
							width={500}
							height={335}
							placeholder="blur"
							blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 335))}`}
						/>
					</Link>
				)}
			</Card.Image>

			<Card.Body className="px-1 py-2 text-left">
				<div className="flex items-center justify-between">
					{!link ? (
						<p className="title">{product.title}</p>
					) : (
						<Link href={link} className="title">
							{product.title}
						</Link>
					)}
					<p className="price">${product.price}</p>
				</div>

				<p className="description pb-3">{product.description}</p>

				<Star rate={product.rating} />

				{children && children}
			</Card.Body>
		</Card.Wrapper>
	);
});

ProductItem.displayName = 'ProductItem';

import { Button, Card, Star } from '@/components';
import Link from 'next/link';
import { ProductItem as ProductItemType } from '@/types';
import Image from 'next/image';
import { shimmer, toBase64 } from '@/utils';
import { useRouter } from 'next/router';

interface ProductItemProps {
	product: ProductItemType;
}

export const ProductItem = ({ product }: ProductItemProps) => {
	const router = useRouter();

	const link = `/products/${product.id}`;

	return (
		<Card.Wrapper onClick={() => router.push(link)}>
			<Card.Image className="max-h-[335px]">
				<Link href={link}>
					<Image
						src={product.thumbnail}
						alt={product.title}
						width={500}
						height={335}
						placeholder="blur"
						blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 335))}`}
					/>
				</Link>
			</Card.Image>

			<Card.Body className="px-1 py-2 text-left">
				<div className="flex items-center justify-between">
					<Link href={link} className="title">
						{product.title}
					</Link>
					<p className="price">${product.price}</p>
				</div>

				<p className="description pb-3">{product.description}</p>

				<Star rate={product.rating} />
			</Card.Body>
		</Card.Wrapper>
	);
};

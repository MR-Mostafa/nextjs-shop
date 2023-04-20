import { Button, Counter } from '@/components';
import { ProductItem } from '@/features';
import { ProductItem as ProductItemType } from '@/types';
import MainLayout from '@/layouts/MainLayout';
import { BiChevronLeft } from 'react-icons/bi';
import { GetServerSidePropsContext } from 'next';
import { _OneMinutes } from '@/constants';
import { getFetcher } from '@/services';
import { ParsedUrlQuery } from 'querystring';
import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { addItemInCart } from '@/store';

interface ProductIdProps {
	data: ProductItemType;
}

interface ProductParams extends ParsedUrlQuery {
	productId?: string;
}

const ProductId = ({ data }: ProductIdProps) => {
	const [cartItems, setAddToCarts] = useRecoilState(addItemInCart);

	/**
	 * It checks the current product already exists in the `cartItems` or not.
	 * If exist, it return last selected count, otherwise return 0
	 **/
	const initialCountValue = useMemo(() => {
		const cartItem = cartItems.findIndex((item) => item.id === data.id);

		return cartItem === -1 ? 0 : cartItems[cartItem].count;
	}, []);

	const [count, setCount] = useState<number>(initialCountValue);

	return (
		<MainLayout
			shouldShowHeader
			link="/products"
			title={
				<Button as="a" variant="link" className="p-1 text-lg font-bold" leftIcon={<BiChevronLeft />}>
					Product Details
				</Button>
			}
		>
			<ProductItem product={data}>
				<div className="flex items-center justify-between pt-2">
					<Counter value={count} setValue={(val) => setCount((prev) => prev + val)} maxValue={data.stock} />

					<Button
						variant="primary"
						onClick={() => {
							setAddToCarts([{ ...data, count }]);
						}}
					>
						{initialCountValue === 0 ? 'Add To Cart' : 'Update Cart Item'}
					</Button>
				</div>
			</ProductItem>
		</MainLayout>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const res = context.res;
	const params = context.params as ProductParams;

	res.setHeader('Cache-Control', `public, s-maxage=${_OneMinutes * 10}, stale-while-revalidate=${_OneMinutes * 9.5}`);

	const productId = params.productId && +params.productId ? Math.abs(+params.productId) : undefined;

	if (!productId) {
		return {
			redirect: {
				destination: '/products',
				permananet: true,
			},
		};
	}

	try {
		const products = await getFetcher<ProductItemType>(`/products/${productId}`);

		return {
			props: {
				data: products.data,
			},
		};
	} catch {
		return {
			redirect: {
				destination: '/products',
				permananet: false,
			},
		};
	}
}

export default ProductId;

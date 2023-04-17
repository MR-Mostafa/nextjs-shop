import { Button } from '@/components';
import MainLayout from '@/layouts/MainLayout';
import { getFetcher } from '@/services';
import { ProductList } from '@/types';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { _OneMinutes } from '@/constants';
import { ParsedUrlQuery } from 'querystring';
import { useState, useEffect, useCallback } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { ProductItem } from '@/features';

interface ProductProps {
	data: ProductList;
}

interface ProductQuery extends ParsedUrlQuery {
	limit?: string;
	page?: string;
}

const Product = ({ data }: ProductProps) => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		return () => setLoading(false);
	}, [router.query]);

	const hasNextPage = () => {
		const { total, limit, skip, products } = data;

		return total <= limit + skip || products.length === 0;
	};

	const hasPreviousPage = () => {
		const { total, skip } = data;

		return skip === 0 || total === 0;
	};

	const handleChangePage = useCallback(
		(number: number) => {
			const query: ProductQuery = router.query;

			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			setLoading(true);

			const page = query.page && +query.page ? Math.abs(+query.page) : 1;
			const limit = query.limit && +query.limit ? Math.abs(+query.limit) : 15;

			router.push(`/products?page=${page + number}&limit=${limit}`);
		},
		[router]
	);

	return (
		<MainLayout
			shouldShowHeader
			link="/products"
			title={
				<Button as="a" variant="link" className="text-lg font-bold">
					Products
				</Button>
			}
		>
			<div className="w-full text-center">
				{loading && <ImSpinner8 strokeWidth="1px" fill="#fff" className="m-auto mb-4 animate-spin fill-black stroke-none text-4xl" />}

				{data.products.length === 0 && <p className="pt-3 text-center font-bold">There are no products available</p>}

				{data.products.length !== 0 && data.products.map((item) => <ProductItem key={item.id} product={item} />)}

				<div className="flex items-center justify-between px-1 pt-4">
					<Button disabled={hasPreviousPage()} className="mr-2	block w-2/4" variant="primary" onClick={() => handleChangePage(-1)}>
						Previous Page
					</Button>

					<Button disabled={hasNextPage()} className="ml-2	block w-2/4" variant="primary" onClick={(e) => handleChangePage(1)}>
						Next Page
					</Button>
				</div>
			</div>
		</MainLayout>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const res = context.res;
	const query = context.query as ProductQuery;

	res.setHeader('Cache-Control', `public, s-maxage=${_OneMinutes * 10}, stale-while-revalidate=${_OneMinutes * 9.5}`);

	const limit = query.limit && +query.limit ? Math.abs(+query.limit) : 15;
	const page = query.page && +query.page ? Math.abs(+query.page) : 0;
	const skip = page === 0 ? 0 : (page - 1) * limit;

	const products = await getFetcher<ProductList>('/products', {
		params: {
			limit: limit.toString(),
			skip: skip.toString(),
		},
	});

	if (products.status !== 200 || !products.data) {
		return {
			props: {
				data: {
					products: [],
					total: 0,
					skip,
					limit,
				},
			},
		};
	}

	return {
		props: {
			data: products.data,
		},
	};
}

export default Product;

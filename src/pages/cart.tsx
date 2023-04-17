import { Button, Counter } from '@/components';
import MainLayout from '@/layouts/MainLayout';
import { BiChevronLeft } from 'react-icons/bi';
import { SearchItem } from '@/features';
import { addItemInCart, getCartInfo } from '@/store';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useMemo } from 'react';
import { CartIndex } from '@/types';

const Cart = () => {
	const cartInfo = useRecoilValue(getCartInfo);
	const updateCountOfCart = useSetRecoilState(addItemInCart);

	const cartIndex = useMemo<CartIndex>(() => {
		return cartInfo.items.reduce((acc: CartIndex, currentValue, index) => {
			return { ...acc, [currentValue.id]: index };
		}, {});
	}, [cartInfo.totalCount]);

	return (
		<MainLayout
			shouldShowHeader
			link="/products"
			title={
				<Button as="a" variant="link" className="p-1 text-lg font-bold" leftIcon={<BiChevronLeft />}>
					My Cart
				</Button>
			}
		>
			{cartInfo.items.length === 0 ? (
				<p className="pt-3 text-center font-bold">The shopping cart is empty</p>
			) : (
				<>
					{cartInfo.items.map((item) => {
						return (
							<SearchItem product={item} key={item.id}>
								<div className="flex items-center justify-between">
									<p className="price pe-3">${item.price}</p>
									<Counter
										value={item.count}
										setValue={(val) => {
											const index = cartIndex[item.id];

											const data = cartInfo.items[index];

											updateCountOfCart([{ ...data, count: data.count + val }]);
										}}
										maxValue={item.stock}
									/>
								</div>
							</SearchItem>
						);
					})}
				</>
			)}

			<div className="mt-8 py-6 border-t border-[#BDBDBD]">
				<ul>
					<li className="flex items-center justify-between">
						<span className="font-bold">Product Count:</span>
						<span>{cartInfo.totalCount}</span>
					</li>

					<li className="flex items-center justify-between pt-4">
						<span className="font-bold">Total:</span>
						<span>${new Intl.NumberFormat().format(cartInfo.totalPrice)}</span>
					</li>
				</ul>
			</div>

			<Button variant="primary" className="block w-full">
				Pay Via PayPal
			</Button>
		</MainLayout>
	);
};

export default Cart;

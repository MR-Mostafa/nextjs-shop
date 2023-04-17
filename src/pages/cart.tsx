import { Button, Counter } from '@/components';
import MainLayout from '@/layouts/MainLayout';
import { BiChevronLeft } from 'react-icons/bi';
import { SearchItem } from '@/features';
import { addItemInCart, getCartInfo } from '@/store';
import { useSetRecoilState, useRecoilValue } from 'recoil';

const Cart = () => {
	const cartInfo = useRecoilValue(getCartInfo);
	const updateCart = useSetRecoilState(addItemInCart);

	return (
		<MainLayout
			shouldShowHeader
			link="/"
			title={
				<Button as="a" variant="link" className="p-1 text-lg font-bold" leftIcon={<BiChevronLeft />}>
					My Cart
				</Button>
			}
		>
			{cartInfo.items.length === 0 && <p className="pt-3 text-center font-bold">The shopping cart is empty</p>}

			{cartInfo.items.length &&
				cartInfo.items.map((item) => {
					return (
						<SearchItem product={item} key={item.id}>
							<div className="flex items-center justify-between">
								<p className="price pe-3">${item.price}</p>
								<Counter value={item.count} setValue={(val) => {}} maxValue={item.stock} />
							</div>
						</SearchItem>
					);
				})}
		</MainLayout>
	);
};

export default Cart;

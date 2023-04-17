import { CartItemsType, CartInfoType } from '@/types';
import { atom, selector } from 'recoil';

export const cartItemsStore = atom<CartItemsType[]>({
	key: 'cartItemsStore',
	default: [] as CartItemsType[],
});

export const getCartInfo = selector<CartInfoType>({
	key: 'getCartInfo',
	get: ({ get }) => {
		const items = get(cartItemsStore);

		const totalPrice = items.reduce((acc: number, current) => {
			return current.price * current.count + acc;
		}, 0);

		return {
			items,
			totalCount: items.length,
			totalPrice,
		};
	},
});

export const addItemInCart = selector<CartItemsType[]>({
	key: 'addItemInCart',
	get: ({ get }) => {
		return get(cartItemsStore);
	},
	set: ({ set, get }, _newValue) => {
		const oldValue = get(cartItemsStore);
		const newValue = (Array.isArray(_newValue) ? _newValue[0] : _newValue) as CartItemsType;

		// 1. When there are no items in the cart
		if (oldValue.length === 0) {
			return set(cartItemsStore, newValue.count === 0 ? [] : [newValue]);
		}

		const duplicatedCartId = oldValue.findIndex((item) => item.id === newValue.id);

		// 2. When cart items not duplicated
		if (duplicatedCartId === -1) {
			return set(cartItemsStore, [...oldValue, newValue]);
		}

		// For duplicated cart items
		return set(
			cartItemsStore,
			oldValue.reduce((acc: CartItemsType[], currentValue) => {
				// 3. If the count is updated & same id, update the count
				// 4. If the count is 0 & same id, remove the item from the cart list
				if (currentValue.id === newValue.id) {
					return newValue.count === 0 ? acc : [...acc, { ...newValue }];
				}

				// 5. Otherwise
				return [...acc, currentValue];
			}, [])
		);
	},
});

import reducer from "./reducer";
import { CART_ACTIONS } from "./actions";

import { PRODUCT_MOCK } from "../testing/product.mock";

describe("Cart Reducer", () => {
	const initialState = { items: {}, size: 0 };

	it("should return the initial state", () => {
		const state = reducer(initialState, {});
        expect(state).toEqual(initialState);
	});

	it("should handle addToCart", () => {
		const state = reducer(initialState, { type: CART_ACTIONS.addItem, payload: PRODUCT_MOCK });
		expect(state).toEqual({
			items: {
				[PRODUCT_MOCK.name + " - " + PRODUCT_MOCK.measurement.displayName]: 1
			},
			size: 1
		});
	});

	it("should handle removeFromCart", () => {
		let currentState = { 
			items: {
				[PRODUCT_MOCK.name + " - " + PRODUCT_MOCK.measurement.displayName]: 2
			},
			size: 2
		};

		const state = reducer(currentState, { type: CART_ACTIONS.removeItem, payload: PRODUCT_MOCK });
		expect(state).toEqual({
			items: {
				[PRODUCT_MOCK.name + " - " + PRODUCT_MOCK.measurement.displayName]: 1
			},
			size: 1
		})
	});
});
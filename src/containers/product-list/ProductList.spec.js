import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createMockStore } from "redux-test-utils";

import ProductList from "./ProductList";
import Product from "../../components/product/Product";

import { CART_ACTIONS } from "../../store/cart/actions";
import { PRODUCT_MOCK } from "../../store/testing/product.mock";

const mockState = {
	products: { items: [PRODUCT_MOCK] },
	cart: { items: [PRODUCT_MOCK], size: 0 }
};

describe("ProductListContainer", () => {
	let store;
	let container;

	beforeEach(() => {
		store = createMockStore(mockState);
		container = mount(
			<Provider store={store}>
				<ProductList />
			</Provider>
		);
	});

	it("renders the component", () => {
		expect(container).toBeTruthy();
	});

	it("renders the products", () => {
		const products = container.find(Product);
		expect(products.length).toBe(1);
	});

	it("adds an item to cart", () => {
		container.find(Product).props().addItem({ ...PRODUCT_MOCK, key: "2" });
		expect(store.isActionTypeDispatched(CART_ACTIONS.addItem)).toBeTruthy();
	});

	it("removes an item from cart", () => {
		container.find(Product).props().removeItem(PRODUCT_MOCK);
		expect(store.isActionTypeDispatched(CART_ACTIONS.removeItem)).toBeTruthy();
	});

	afterEach(() => container.unmount());
});

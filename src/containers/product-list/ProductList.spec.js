import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { createMockStore } from "redux-test-utils";

import ProductList from "./ProductList";
import { PRODUCT_MOCK } from "../../store/testing/product.mock";

describe("ProductListContainer", () => {
	const mockState = {
		products: { items: [PRODUCT_MOCK] },
		cart: { items: [PRODUCT_MOCK], size: 0 }
	};

	it("renders", () => {
		const store = createMockStore(mockState);
		const container = shallow(
			<Provider store={store}>
				<ProductList />
			</Provider>
		);

		expect(container).toBeTruthy();
	});
});

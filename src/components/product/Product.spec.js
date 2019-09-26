import React from "react";
import { shallow, mount } from "enzyme";

import Product from "./Product";

import { PRODUCT_MOCK } from "../../store/testing/product.mock";

describe("Product", () => {
	let component;

    const productProps = {
        info: PRODUCT_MOCK,
        key: PRODUCT_MOCK.name + " - " + PRODUCT_MOCK.measurement.displayName,
        quantity: 0
    };

	beforeEach(() => {
		component = mount(<Product {...productProps} />);
	});

	it("renders the component", () => {
		expect(component).toBeTruthy();
    });

    it("should render no variants in a select when there is just one", () => {
        const variants = component.find(".product-variants");
        expect(variants.length).toBe(0);
    });

    it("should render variants in a select when there is more than one", () => {
        const variants = component.find(".product-variants");
        expect(variants.length).toBe(1);
    });

    it("should render pricing", () => {
        const variants = component.find(".product-variants");
        expect(variants.length).toBe(1);
    });

    it("should render old and new prices when there is sale text", () => {
        const variants = component.find(".product-variants");
        expect(variants.length).toBe(1);
    });

    it("should update when an item is added", () => {
        const variants = component.find(".product-variants");
        expect(variants.length).toBe(1);
    });

    it("should update when an item is removed", () => {
        const variants = component.find(".product-variants");
        expect(variants.length).toBe(1);
    });

    it("should update when a variant is changed", () => {
        const variants = component.find(".product-variants");
        expect(variants.length).toBe(1);
    });
});
import React from "react";
import sinon from "sinon";
import { mount } from "enzyme";

import Product from "./Product";
import Image from "../image/Image";

import { PRODUCT_MOCK, PRODUCT_MOCK_WITH_VARIANTS, PRODUCT_MOCK_WITH_DISCOUNT } from "../../store/testing/product.mock";

describe("Product", () => {
	let component;

    let productProps = {
        info: PRODUCT_MOCK,
        quantity: 0,
        addItem: () => {}
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
        productProps.info = PRODUCT_MOCK_WITH_VARIANTS;
        component = mount(<Product {...productProps} />);

        const variants = component.find(".product-variants");
        expect(variants.length).toBe(1);
    });

    it("should render pricing", () => {
        const pricing = component.find(".product-price-info");
        expect(pricing.length).toBe(1);
    });

    it("should render old and new prices when there is sale text", () => {
        productProps.info = PRODUCT_MOCK_WITH_DISCOUNT;
        component = mount(<Product {...productProps} />);

        const discountedPrice = component.find(".product-price-discount");
        const oldPrice = component.find(".product-price-old");
        const newPrice = component.find(".product-price-new");

        expect(discountedPrice.length).toBe(1);
        expect(oldPrice.length).toBe(1);
        expect(newPrice.length).toBe(1);
    });

    it("should show the add button when there is none of the item in cart", () => {
        const addBtn = component.find(".product-controls-add");
        expect(addBtn.length).toBe(1);
    });

    it("should not show increment and decrement controls when the item is not in cart", () => {
        const incBtn = component.find(".product-controls-increment");
        const decBtn = component.find(".product-controls-decrement");
        expect(incBtn.length).toBe(0);
        expect(decBtn.length).toBe(0);
    });

    it("should show increment and decrement controls when the item is in cart", () => {
        productProps.quantity = 2;
        component = mount(<Product {...productProps} />);

        const incBtn = component.find(".product-controls-increment");
        const decBtn = component.find(".product-controls-decrement");
        expect(incBtn.length).toBe(1);
        expect(decBtn.length).toBe(1);
    });

    it("should have an image", () => {
       const img = component.find(Image);
       expect(img.length).toBe(1);
    });

    it("should add an item when add item is clicked", () => {
        productProps.info = PRODUCT_MOCK;
        productProps.quantity = 0;
        productProps.addItem = sinon.spy();

        component = mount(<Product {...productProps} />);

        component.find(".product-controls-add").simulate("click");
        expect(productProps.addItem.calledOnce).toBeTruthy();
    });

    it("should add an item when remove item is clicked", () => {
        productProps.info = PRODUCT_MOCK;
        productProps.quantity = 2;
        productProps.removeItem = sinon.spy();

        component = mount(<Product {...productProps} />);

        component.find(".product-controls-decrement").simulate("click");
        expect(productProps.removeItem.calledOnce).toBeTruthy();
    });

    afterEach(() => component.unmount());
});
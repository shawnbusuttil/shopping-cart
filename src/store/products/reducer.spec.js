import reducer from "./reducer";
import { PRODUCT_ACTIONS } from "./actions";

import { parseWeighting } from "../product.utils";
import { PRODUCT_MOCK } from "../testing/product.mock";

describe("Products Reducer", () => {
    it("should return the initial state", () => {
        const state = reducer({}, {});
        expect(state).toEqual({});
    });

    it("should handle fetchProducts", () => {
        const state = reducer({}, { type: PRODUCT_ACTIONS.fetchProducts });
        state.items.map((item, i) => expect(item.key).toBe(i));
    });

    it("should handle changeVariant", () => {
        const state = reducer({ items: [PRODUCT_MOCK] }, { type: PRODUCT_ACTIONS.changeVariant, payload: {
            product: PRODUCT_MOCK,
            variant: 0
        }});
        
        expect(state.items[0].pricePerUnit).toEqual(PRODUCT_MOCK.variants[0].pricePerUnit);

        const variantWeightInKg = parseWeighting(PRODUCT_MOCK.variants[0].measurement.displayName);
        const variantPricePerUnit = PRODUCT_MOCK.variants[0].pricePerUnit.split("/")[0].substring(1) * 100;

        expect(state.items[0].price.pence).toEqual(variantPricePerUnit * variantWeightInKg);
    });
});
import { PRODUCT_ACTIONS } from "./actions.js";

import productData from "../../data/products.json";
import { parseSaleText, parseWeighting } from "../product.utils";

const INITIAL_STATE = {
    items: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PRODUCT_ACTIONS.fetchProducts: {
            const products = productData.data.productSearch.nodes.map((node, i) => {
                if (node.variants.length) {
                    node.variants.unshift({
                        pricePerUnit: node.pricePerUnit,
                        measurement: node.measurement
                    });
                }
                return { key: i, ...node };
            });
            return { ...state, items: products };
        }
        case PRODUCT_ACTIONS.changeVariant: {
            const product = action.payload.product;

            const variant = product.variants[action.payload.variant];
            
            const items = state.items.map((item, i) => {
                if (product.key === i) {
                    const variantWeightInKg = parseWeighting(variant.measurement.displayName);

                    // Extract the numerical data from the price per unit, omitting the currency and converting to pence.
                    // If price per unit is null, take the original.
                    const variantPricePerUnit = variant.pricePerUnit ? variant.pricePerUnit.split("/")[0].substring(1) * 100 
                        : product.variants[0].pricePerUnit.split("/")[0].substring(1) * 100;

                    // Calculate new price.
                    const priceCalc = variantWeightInKg * variantPricePerUnit;

                    // If there is a sale price, then the price is the discounted price.
                    const salePrice = product.saleText ? {
                        pence: priceCalc
                    } : null;

                    const price = {
                        pence: product.saleText ? priceCalc + ((parseSaleText(product.saleText) / 100) * priceCalc)
                            : priceCalc
                    };

                    return {
                        ...item,
                        pricePerUnit: variant.pricePerUnit,
                        price,
                        salePrice
                    }
                }
                return item;
            })

            return { ...state, items };
        }
        default:
            return state;
    }
};

export default reducer;
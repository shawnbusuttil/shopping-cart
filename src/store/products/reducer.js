import { PRODUCT_ACTIONS } from "./actions.js";

import productData from "../../data/products.json";

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

/* Extract the numerical data from the string. - Ideally data is presented in numerical format from API. */
function parseWeighting(displayName) {
    const weight = displayName
        .substring(displayName.lastIndexOf("(") + 1, displayName.lastIndexOf(")"))
        .replace("min. ", "");

    if (!weight) {
        return 1;
    }
    if (weight.indexOf("kg") !== -1) {
        return weight.substring(0, weight.length - 2);
    }
    if (weight.indexOf("g") !== -1) {
        return weight.substring(0, weight.length - 1) / 1000;
    }
    return 0;
}

function parseSaleText(saleText) {
    const discount = saleText.split(" ")[0];
    return discount.substring(0, discount.length - 1);
}

export default reducer;
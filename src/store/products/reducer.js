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
            const variant = action.payload.variant;

            const items = state.items.map((item, i) => {
                if (product.key === i) {
                    const pricePerUnit = item.pricePerUnit.split("/")[0].substring(1) * 100;
                    const vPricePerUnit = variant.split("/")[0].substring(1) * 100;
                    console.log(vPricePerUnit);
                    return {
                        ...item,
                        pricePerUnit: variant,
                        price: {
                            pence: (item.price.pence / pricePerUnit) * vPricePerUnit
                        }
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
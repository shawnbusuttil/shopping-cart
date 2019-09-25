export const PRODUCT_ACTIONS = {
    fetchProducts: "[Products] Fetch Items",
    changeVariant: "[Products] Change Variant"
}

export const productActions = {
    fetchProducts() {
        return {
            type: PRODUCT_ACTIONS.fetchProducts
        }
    },
    changeVariant(payload) {
        return {
            type: PRODUCT_ACTIONS.changeVariant,
            payload
        }
    }
}
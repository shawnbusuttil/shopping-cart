export const CART_ACTIONS = {
    addItem: "[Cart] Add Item",
    removeItem: "[Cart] Remove Item"
}

export const cartActions = {
    addItem(payload) {
        return {
            type: CART_ACTIONS.addItem,
            payload
        }
    },
    removeItem(payload) {
        return {
            type: CART_ACTIONS.removeItem,
            payload
        }
    }
}
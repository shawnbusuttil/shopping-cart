import { CART_ACTIONS } from "./actions.js";

const INITIAL_STATE = {
    items: {},
    size: 0
};

// In reality, you would also store the price here.
const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CART_ACTIONS.addItem: {
            const item = action.payload;
            const key = item.name + " - " + item.measurement.displayName;

            return { 
                ...state, 
                items: {
                    ...state.items, 
                    [key]: (state.items[key] || 0) + 1
                },
                size: state.size + 1
            };
        }
        case CART_ACTIONS.removeItem: {
            const item = action.payload;
            const key = item.name + " - " + item.measurement.displayName;

            return {
                ...state,
                items: {
                    ...state.items, 
                    [key]: Math.max((state.items[key] || 0) - 1, 0)
                },
                size: Math.max(state.size - 1, 0)
            };
        }
        default:
            return state;
    }
};

export default reducer;
// ACTIONS
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const TOGGLE_CART = 'TOGGLE_CART';

// ACTION CREATORS
export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        payload: item,
    };
};

export const toggleCart = (shouldOpen) => {
    return {
        type: TOGGLE_CART,
        payload: shouldOpen,
    };
};

export const removeFromCart = (id) => {
    return {
        type: REMOVE_FROM_CART,
        payload: id,
    };
};

// REDUCERS
const addToCartReducer = (state = { isOpen: false, items: [] }, action) => {
    const { payload, type } = action;
    switch (type) {
    case TOGGLE_CART:
        return {
            ...state,
            isOpen: payload,
        };
    case ADD_TO_CART:
        // Warning: Encountered two children with the same key, `2`
        return {
            ...state,
            isOpen: true,
            items: [...state.items, payload],
        };

    case REMOVE_FROM_CART:
        // we expect payload to be the item's ID that we want to remove in this case
        for (const itemId in state.items) {
            // console.dir(itemId);
            if (state.items[itemId].id == payload) {
                let newItems  = state.items;
                newItems.splice(itemId, 1);
                return {
                    ...state,
                    items: newItems
                };
            }
        }
    default:
        return state;
    }
};

export default addToCartReducer;

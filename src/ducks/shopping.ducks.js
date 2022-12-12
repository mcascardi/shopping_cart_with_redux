// ACTIONS
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const TOGGLE_CART = 'TOGGLE_CART';
const CHANGE_QTY = 'CHANGE_QTY';

// CHANGE QUANTITY
export const changeQty = (itemId, increment=true) => {
    return {
        type: CHANGE_QTY,
        payload: {id: itemId, increment: increment}
    };
};

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
    const { payload,
            type } = action;
    let newItems  = state.items;
    switch (type) {
    case CHANGE_QTY:
        const itemIndex = newItems.findIndex(item => item.id === payload.id);
        if (payload.increment) {
            newItems[itemIndex].qty += 1;
        } else if (payload.increment === false &&  newItems[itemIndex].qty > 1 ) {
            newItems[itemIndex].qty -=1;
        }
        return {
            ...state,
            items: newItems,
        };

    case TOGGLE_CART:
        return {
            ...state,
            isOpen: payload,
        };

    case ADD_TO_CART:
        payload.qty = 1;
        return {
            ...state,
            isOpen: true,
            items: [...state.items, payload],
        };

    case REMOVE_FROM_CART:
        removeFromCart(state);
        // we expect payload to be the item's ID that we want to remove in this case
        for (const itemId in state.items) {
            // console.dir(itemId);
            if (state.items[itemId].id === payload) {
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

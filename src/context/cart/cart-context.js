import React, {createContext, useContext, useReducer} from 'react';


// Local storage key
const CART_DATA =
    'CART_DATA'

// Initial state of the cart
const initialState = {
    items: [],  // structure need is Array<{model; quantity;}>
    total: 0,
    hasCheckout: false,
    orderCode: ''
};

// Action types
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CLEAR_CART = 'CLEAR_CART';
const UPDATE_ITEM = 'UPDATE_ITEM';
const CALCULATE_TOTAL = 'CALCULATE_TOTAL'
const HAS_CHECKOUT = 'HAS_CHECKOUT'
const UPDATE_ORDER_CODE = 'UPDATE_ORDER_CODE'

const calculateGrandTotal = (items) => {
    return Math.max(items.reduce((total, item) => total + (item.model?.price * item.quantity) || 0, 0), 0);
}

const getCartFromStorage = () => {
    if (window) {
        try {
            return JSON.parse(localStorage.getItem(CART_DATA)) || initialState
        } catch {
            return initialState
        }
    } else {
        return initialState
    }
}

const saveCartToStorage = (cart) => {
    if (window) {
        localStorage.setItem(CART_DATA, JSON.stringify(cart))
    }
}

// Cart reducer function to handle state changes
const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_ITEM: {
            const currentItems = state.items || []
            const currentItemIdx = currentItems.findIndex(o => o.model._id === action.payload.model._id)
            if (currentItemIdx >= 0) {
                const quantity = currentItems[currentItemIdx].quantity
                currentItems[currentItemIdx] = {
                    ...currentItems[currentItemIdx],
                    quantity: currentItems[currentItemIdx].quantity + action.payload.quantity
                }
            } else {
                currentItems.push(action.payload);
            }
            const orderCode = state.items.length ? state.orderCode || `DH${new Date().getTime()}` : `DH${new Date().getTime()}`
            const res = {...state, orderCode, items: [...currentItems], hasCheckout: false};
            saveCartToStorage(res)
            return res
        }
        case UPDATE_ITEM: {
            const currentItems = state.items || []
            const currentItemIdx = currentItems.findIndex(o => o.model._id === action.payload.model._id)
            if (action.payload.quantity) {
                if (currentItemIdx >= 0) {
                    currentItems[currentItemIdx] = {
                        ...currentItems[currentItemIdx],
                        ...action.payload
                    }
                }
            } else {
                currentItems.splice(currentItemIdx, 1)
            }
            const res = {...state, items: currentItems}
            saveCartToStorage(res)
            return res
        }
        case REMOVE_ITEM: {
            // remove by id
            const filteredItems = state.items.filter(item => item.model._id !== action.payload._id);
            const res = {...state, items: filteredItems};
            saveCartToStorage(res)
            return res
        }

        case CLEAR_CART: {
            const res = {
                ...state,
                items: []
            };
            saveCartToStorage(res)
            return res
        }

        case CALCULATE_TOTAL: {
            const total = calculateGrandTotal(state.items)
            const res = {
                ...state,
                total
            }
            saveCartToStorage(res)
            return res
        }
        case HAS_CHECKOUT: {
            const res = {
                ...state,
                hasCheckout: true
            }
            saveCartToStorage(res)
            return res
        }
        case UPDATE_ORDER_CODE: {
            const res = {
                ...state,
                orderCode: action.payload
            }
            saveCartToStorage(res)
            return res
        }
        default: {
            saveCartToStorage(state)
            return state;
        }
    }
};

// Create the context
const CartContext = createContext();

// CartProvider component to wrap around parts of the app that need access to the cart
export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, getCartFromStorage());

    const addItemToCart = (item) => {
        dispatch({type: ADD_ITEM, payload: item});
        dispatch({type: CALCULATE_TOTAL});
    };

    const removeItemFromCart = (item) => {
        dispatch({type: REMOVE_ITEM, payload: item});
        dispatch({type: CALCULATE_TOTAL});
    };

    const clearCart = () => {
        dispatch({type: CLEAR_CART});
        dispatch({type: CALCULATE_TOTAL});
    };

    const updateItemFromCart = (item) => {
        dispatch({type: UPDATE_ITEM, payload: item})
        dispatch({type: CALCULATE_TOTAL});
    }

    const checkoutComplete = () => {
        dispatch({type: HAS_CHECKOUT});
    }

    const updateOrderCode = (code) => {
        dispatch({type: UPDATE_ORDER_CODE, payload: code});
    }

    return (
        <CartContext.Provider
            value={{
                ...state,
                addItemToCart,
                updateItemFromCart,
                removeItemFromCart,
                clearCart,
                checkoutComplete,
                updateOrderCode
            }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export const useCart = () => {
    return useContext(CartContext);
};

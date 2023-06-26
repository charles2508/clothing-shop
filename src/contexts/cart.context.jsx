import { createContext, useState, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";


const addCartItem = (cartItems, productToAdd) => {
    var existingItem = cartItems.find((item) => {return item.id === productToAdd.id});
    if (existingItem) {
        return cartItems.map((item) => {
            if (item.id === productToAdd.id) {
                return {...item, quantity: item.quantity + 1}
            } else {
                return item;
            }
        })
    } else {
        return [...cartItems, {...productToAdd, quantity: 1}]
    }
}


const removeCartItem = (cartItems, cartItemToRemove) => {
    var existingItem = cartItems.find((item) => {return item.id === cartItemToRemove.id});
    if (existingItem) {
        if (existingItem.quantity === 1) {
            return cartItems.filter((item) => item.id !== cartItemToRemove.id);
        }
        return cartItems.map((item) => {
            if (item.id === cartItemToRemove.id) {
                return {...item, quantity: item.quantity - 1}
            } else {
                return item;
            }
        })
    }
}

const removeProductFromCart = (cartItems, productToDelete) => {
    return cartItems.filter((item) => item.id !== productToDelete.id);
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    totalPrice: 0,
    cartCount: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload 
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            {
                return {
                    ...state,
                    isCartOpen: !state.isCartOpen
                }
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    removeItemFromCart: () => null,
    removeWholeProductFromCart: () => null,
    totalPrice: 0,
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [totalPrice, setTotalPrice] = useState(0);
    
    const [state, dispatchCart] = useReducer(cartReducer, INITIAL_STATE);
    const { isCartOpen, cartItems, cartCount, totalPrice } = state;

    // useEffect(() => {
    //     const totalPrice = cartItems.reduce((currentPrice, currentCartItem) => currentPrice + currentCartItem.price * currentCartItem.quantity, 0);
    //     setTotalPrice(totalPrice);
    // }, [cartItems])

    const addItemToCart = (productToAdd) => { 
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    
    const removeWholeProductFromCart = (productToDelete) => {
        const newCartItems = removeProductFromCart(cartItems, productToDelete);
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = () => {
        dispatchCart(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN))
    }

    const value = {
        isCartOpen, //same as isCartOpen: isCartOpen
        setIsCartOpen, //same as setIsCartOpen: : setIsCartOpen
        cartItems,
        addItemToCart,
        removeItemFromCart,
        removeWholeProductFromCart,
        totalPrice,
        cartCount
    }

    const updateCartItemsReducer = (cartItems) => {
        const cartCount = cartItems.reduce((currentTotal, currentCartItem) => currentTotal + currentCartItem.quantity, 0);
        const totalPrice = cartItems.reduce((currentPrice, currentCartItem) => currentPrice + currentCartItem.price * currentCartItem.quantity, 0);
        dispatchCart(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartCount: cartCount, totalPrice: totalPrice, cartItems: cartItems}))
    }

    return(
        <CartContext.Provider value={value}>{ children }</CartContext.Provider>
    )
}
import { createAction } from "../../utils/reducer/reducer.utils"
import { CART_ACTION_TYPES } from "./cart.types"

export const createCartItemAction = (cartItems) => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
export const createIsCartOpenAction = (isCartOpen) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);


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

export const addItemToCart = (cartItems, productToAdd) => { 
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createCartItemAction(newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createCartItemAction(newCartItems);
}

export const removeWholeProductFromCart = (cartItems, productToDelete) => {
    const newCartItems = removeProductFromCart(cartItems, productToDelete);
    return createCartItemAction(newCartItems);
}

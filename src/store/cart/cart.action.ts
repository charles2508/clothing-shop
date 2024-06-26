import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils"
import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItemType } from "./cart.types"

export const createCartItemAction = withMatcher((cartItems: CartItemType[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));
export const createIsCartOpenAction = withMatcher((isCartOpen: Boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItemType[]>;
export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, Boolean>;

const addCartItem = (cartItems: CartItemType[], productToAdd: CategoryItem): CartItemType[] => {
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


const removeCartItem = (cartItems: CartItemType[], cartItemToRemove: CategoryItem): CartItemType[] => {
    var existingItem = cartItems.find((item) => {return item.id === cartItemToRemove.id});
    if (existingItem && existingItem.quantity === 1) {
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

const removeProductFromCart = (cartItems: CartItemType[], productToDelete: CategoryItem): CartItemType[] => {
    return cartItems.filter((item) => item.id !== productToDelete.id);
}

export const addItemToCart = (cartItems: CartItemType[], productToAdd: CategoryItem): SetCartItems => { 
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createCartItemAction(newCartItems);
}

export const removeItemFromCart = (cartItems: CartItemType[], cartItemToRemove: CategoryItem): SetCartItems => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createCartItemAction(newCartItems);
}

export const removeWholeProductFromCart = (cartItems: CartItemType[], productToDelete: CartItemType): SetCartItems => {
    const newCartItems = removeProductFromCart(cartItems, productToDelete);
    return createCartItemAction(newCartItems);
}

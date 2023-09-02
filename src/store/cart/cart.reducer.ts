import { createCartItemAction, createIsCartOpenAction } from "./cart.action";
import { CartItemType } from "./cart.types";
import { AnyAction } from "redux";

export type CartState = {
    readonly isCartOpen: Boolean;
    readonly cartItems: CartItemType[];
}

const INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: []
}

export const cartReducer = (state = INITIAL_STATE, action: AnyAction): CartState => {
    // const { type, payload } = action;

    if (createCartItemAction.match(action)) {
        return {
            ...state,
            cartItems: action.payload
        } 
    }

    if (createIsCartOpenAction.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload
        }
    }

    return state;

    // switch(type) {
    //     case CART_ACTION_TYPES.SET_CART_ITEMS:
    //         return {
    //             ...state,
    //             cartItems: payload
    //         }
    //     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
    //         return {
    //             ...state,
    //             isCartOpen: payload
    //         }
    //     default:
    //         return state;
    // }
}
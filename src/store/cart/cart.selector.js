import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;


export const selectCartItems = createSelector(
    [selectCartReducer],
    (cartReducer) => cartReducer.cartItems
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((currentTotal, currentCartItem) => currentTotal + currentCartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((currentPrice, currentCartItem) => currentPrice + currentCartItem.price * currentCartItem.quantity, 0)
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cartReducer) => cartReducer.isCartOpen
)
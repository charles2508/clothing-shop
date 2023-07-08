// import { createContext, useState, useEffect, useReducer } from "react";
// import { createAction } from "../utils/reducer/reducer.utils";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";


// export const CartContext = createContext({
//     setIsCartOpen: () => null,
//     addItemToCart: () => null,
//     removeItemFromCart: () => null,
//     removeWholeProductFromCart: () => null,
// });

// export const CartProvider = ({ children }) => {
//     // const [isCartOpen, setIsCartOpen] = useState(false);
//     // const [cartItems, setCartItems] = useState([]);
//     // const [totalPrice, setTotalPrice] = useState(0);
    
//     //const [state, dispatchCart] = useReducer(cartReducer, INITIAL_STATE);
//     //const { isCartOpen, cartItems } = state;

//     // useEffect(() => {
//     //     const totalPrice = cartItems.reduce((currentPrice, currentCartItem) => currentPrice + currentCartItem.price * currentCartItem.quantity, 0);
//     //     setTotalPrice(totalPrice);
//     // }, [cartItems])



//     const setIsCartOpen = () => {
//         dispatchCart(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN))
//     }

//     const value = {
//         setIsCartOpen, same as setIsCartOpen: : setIsCartOpen
//         addItemToCart,
//         removeItemFromCart,
//         removeWholeProductFromCart,
//     }

//     const updateCartItemsReducer = (cartItems) => {
//         dispatchCart(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartCount: cartCount, totalPrice: totalPrice, cartItems: cartItems}))
//     }

//     return(
//         <CartContext.Provider value={value}>{ children }</CartContext.Provider>
//     )
// }
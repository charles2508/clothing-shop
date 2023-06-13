import { createContext, useState } from "react";


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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => { 
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {
        isCartOpen, //same as isCartOpen: isCartOpen
        setIsCartOpen, //same as setIsCartOpen: : setIsCartOpen
        cartItems,
        addItemToCart
    }

    return(
        <CartContext.Provider value={value}>{ children }</CartContext.Provider>
    )
}
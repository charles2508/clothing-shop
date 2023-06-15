import { createContext, useState, useEffect } from "react";


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


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    removeItemFromCart: () => null,
    removeWholeProductFromCart: () => null,
    totalPrice: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const totalPrice = cartItems.reduce((currentPrice, currentCartItem) => currentPrice + currentCartItem.price * currentCartItem.quantity, 0);
        setTotalPrice(totalPrice);
    }, [cartItems])

    const addItemToCart = (productToAdd) => { 
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }
    
    const removeWholeProductFromCart = (productToDelete) => {
        setCartItems(removeProductFromCart(cartItems, productToDelete));
    }

    const value = {
        isCartOpen, //same as isCartOpen: isCartOpen
        setIsCartOpen, //same as setIsCartOpen: : setIsCartOpen
        cartItems,
        addItemToCart,
        removeItemFromCart,
        removeWholeProductFromCart,
        totalPrice
    }

    return(
        <CartContext.Provider value={value}>{ children }</CartContext.Provider>
    )
}
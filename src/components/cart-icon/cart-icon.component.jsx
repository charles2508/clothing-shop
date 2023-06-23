import './cart-icon.styles.jsx'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles.jsx';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);
    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }

    return(
        <CartIconContainer onClick={ toggleIsCartOpen }>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartItems.reduce((currentTotal, currentCartItem) => currentTotal + currentCartItem.quantity, 0)}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;
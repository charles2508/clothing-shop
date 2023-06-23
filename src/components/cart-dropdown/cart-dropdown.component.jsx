import Button from '../button/button.component'
import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item.component'

const CartDropDown = () => {
    const { cartItems, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    }

    return(
        <CartDropdownContainer>
            <CartItems>
                {   cartItems.length ?
                    (cartItems.map((item) => {
                        return(
                            <CartItem key={item.id} cartItem={item}/>
                        )
                    })) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropDown;
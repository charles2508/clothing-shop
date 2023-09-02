import Button from '../button/button.component'
import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'
//import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
//import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item.component'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector'
import { createIsCartOpenAction } from '../../store/cart/cart.action'

const CartDropDown = () => {
    //const { cartItems, setIsCartOpen } = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => selectCartItems(state));
    const isCartOpen = useSelector((state) => selectIsCartOpen(state)); 

    const navigate = useNavigate();
    
    // useCallback will memoize the call back function. The function is only instantiated again if any of the parameters inside an array have changed
    // useCallback will memoize the function itself, not the RETURN VALUE from the function.
    // All of the variables inside useCallback's function will be defined and memoized as well
    const goToCheckoutHandler = useCallback(() => {
        dispatch(createIsCartOpenAction(!isCartOpen));
        navigate('/checkout');
    }, [navigate, dispatch, isCartOpen]);

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
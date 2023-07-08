import './cart-icon.styles.jsx'
//import { useContext } from 'react';
//import { CartContext } from '../../contexts/cart.context';
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles.jsx';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectCartCount, selectIsCartOpen} from '../../store/cart/cart.selector.js';
import { createIsCartOpenAction} from '../../store/cart/cart.action.js';

const CartIcon = () => {
    //const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);
    const dispatch = useDispatch();
    const cartCount = useSelector((state) => selectCartCount(state));
    const isCartOpen = useSelector((state) => selectIsCartOpen(state));

    const toggleIsCartOpen = () => {
        dispatch(createIsCartOpenAction(!isCartOpen));
    }

    return(
        <CartIconContainer onClick={ toggleIsCartOpen }>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;
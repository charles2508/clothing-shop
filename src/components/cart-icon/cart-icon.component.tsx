import './cart-icon.styles'
//import { useContext } from 'react';
//import { CartContext } from '../../contexts/cart.context';
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectCartCount, selectIsCartOpen} from '../../store/cart/cart.selector';
import { createIsCartOpenAction} from '../../store/cart/cart.action';
import { RootState } from '../../store/store.js';

const CartIcon = () => {
    //const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);
    const dispatch = useDispatch();
    const cartCount = useSelector((state: RootState) => selectCartCount(state));
    const isCartOpen = useSelector((state: RootState) => selectIsCartOpen(state));

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
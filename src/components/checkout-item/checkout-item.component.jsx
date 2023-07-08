import './checkout-item.scss'
//import { useContext } from 'react';
//import { CartContext } from '../../contexts/cart.context';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addItemToCart, removeWholeProductFromCart, removeItemFromCart} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    //const { addItemToCart, removeItemFromCart, removeWholeProductFromCart } = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => selectCartItems(state));

    const removeProductHandler = () => {
        dispatch(removeWholeProductFromCart(cartItems, cartItem));
    }

    const addItemHandler = () => {
        dispatch(addItemToCart(cartItems, cartItem));
    }

    const removeItemHandler = () => {
        dispatch(removeItemFromCart(cartItems, cartItem));
    }

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={removeProductHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;
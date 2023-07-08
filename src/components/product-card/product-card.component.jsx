import './product-card.styles.scss';
//import { useContext } from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
//import { CartContext } from '../../contexts/cart.context';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addItemToCart} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => selectCartItems(state))

    const handleAddToCart = () => {
        dispatch(addItemToCart(cartItems, product));
    }

    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={handleAddToCart}>Add To Card</Button>
        </div>
    )
}

export default ProductCard;
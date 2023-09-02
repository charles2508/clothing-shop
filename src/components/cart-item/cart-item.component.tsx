import { CartItemType } from '../../store/cart/cart.types';
import './cart-item.styles.scss'
import { FC, memo } from 'react';

type CartItemProps = {
    cartItem: CartItemType
}

// Additional feature for React's memo:
// Only when { cartItem } changes, the Component will be rerendered.
const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;

    return(
        <div className="cart-item-container">
            <img src={imageUrl} alt={`${name}`}/>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x {price}</span>
            </div>
        </div>
    )
})

export default CartItem;
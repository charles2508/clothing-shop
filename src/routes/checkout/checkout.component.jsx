import './checkout.styles.scss'
//import { useContext } from 'react';
//import { CartContext } from '../../contexts/cart.context';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { useSelector } from 'react-redux';

const Checkout = () => {
    //const { cartItems, totalPrice } = useContext(CartContext);
    const cartItems = useSelector((state) => selectCartItems(state));
    const totalPrice = useSelector((state) => selectCartTotal(state))

    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((cartItem) => {
            
                    return(
                        <div>
                            <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                        </div>
                    )
                })
            }
            <span className='total'>Total: ${totalPrice}</span>
        </div>
    )
}

export default Checkout;
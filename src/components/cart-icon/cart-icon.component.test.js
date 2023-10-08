import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test/test.utils";
import CartIcon from "./cart-icon.component";

describe('Cart Icon tests', () => {
    test('Uses preloaded state to render', () => {
        const initialCartItems = [
            {id: 1, name: 'Item A', imageUrl: 'test', price: 10, quantity: 1},
            {id: 3, name: 'Item B', imageUrl: 'test', price: 100, quantity: 2}
        ]
        // Idea: Wrap <CartIcon> inside Provider tag:
        // <Provider><CartIcon/></Provider>
        renderWithProviders(
            <CartIcon/>,
            {
                preloadedState: {
                    cart: { cartItems: initialCartItems }
                }
            }    
        );

        const cartCountElement = screen.getByText('3');
        expect(cartCountElement).toBeInTheDocument();
    })
})
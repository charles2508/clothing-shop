import { screen, fireEvent} from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.utils';
import ProductCard from '../product-card.component';

describe('Product Card tests', () => {
    test('it should add the product item when Product Card button is clicked' , async () => {
        const mockProduct = {
            id: 1,
            imageUrl: 'test',
            name: 'Item A',
            price: 250
        };

        // get the store back from renderWithProviders
        const { store } = renderWithProviders(
            <ProductCard product={mockProduct}/>,
            {
                preloadedState: {
                    cart: {
                        cartItems: []
                    }
                }
            }
        );

        const addToCartButtonElement = screen.getByText(/add to card/i);
        expect(addToCartButtonElement).toBeInTheDocument();
        await fireEvent.click(addToCartButtonElement); //click event for addToCartButtonElemet
        const cartItemsAdded = store.getState().cart.cartItems;
        expect(cartItemsAdded.length).toEqual(1);
        expect(cartItemsAdded[0]).toEqual({
            id: 1,
            imageUrl: 'test',
            name: 'Item A',
            price: 250,
            quantity: 1
        });

    })
})
import { screen } from "@testing-library/react";
import Category from "../category.component";
import { renderWithProviders } from "../../../utils/test/test.utils";

// Mock will replace the 'react-router-dom' with whatever returned by the callback
jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
        useParams: () => ({category: 'mens'})
    }

});


// Mock is full mocking, Spy is partial mocking.
// Mock means we have to REPLACE ALL of the function implementation, 
// whereas Spy means we only need to PARTIALLY REPLACE the function implementation
describe('Category Tests', () => {
    test('It should render a Spinner if isLoading is true', () => {
        
        renderWithProviders(<Category/>, {
            preloadedState: {
                categories: {
                    categoriesArray: [],
                    isLoading: true
                }
            }
        });

        const spinnerElement = screen.getByTestId('spinner');
        expect(spinnerElement).toBeInTheDocument();
    });

    test('It should render Products if isLoading is false', () => {
        
        renderWithProviders(<Category/>, {
            preloadedState: {
                categories: {
                    categoriesArray: [
                        {
                            title: 'mens', 
                            items: [
                            {id: 1, name: 'Product 1', imageUrl: 'asdads', price: 20},
                            {id: 2, name: 'Product 2', imageUrl: 'asdads1', price: 70}
                        ]}
                    ],
                    isLoading: false
                }
            }
        });

        const spinnerElement = screen.queryByTestId('spinner');
        expect(spinnerElement).toBeNull();

        const product1 = screen.getByText(/product 1/i);
        expect(product1).toBeInTheDocument();
    });
});
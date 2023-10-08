import { screen, fireEvent } from "@testing-library/react";
import * as reactRedux from 'react-redux';

import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utils/test/test.utils";
import { USER_ACTION_TYPES } from "../../../store/user/user.types";

// DIFFERENCE BETWEEN MOCK and SPYON:
// - MOCK: mock the whole library/module
// - SpyOn: mock the specific function (hook) inside a module. The purpose is to interact with the (behaviour of the) function itself. 
// Just to fix typescript issue when doing spyOn reactRedux
jest.mock('react-redux', () => {
    return {
      __esModule: true,    //    <----- this __esModule: true is important
      ...jest.requireActual('react-redux')
    };
});

describe('Navigation tests', () => {
    test('It should render a Sign In Link if there is no currentUser', () => {
        renderWithProviders(
            <Navigation/>,
            { 
                preloadedState: {
                    user: {
                        currentUser: null
                    }
                }
            }
        )
        const signInLinkElement = screen.getByText(/sign in/i);
        expect(signInLinkElement).toBeInTheDocument();
        
        const signOutLinkElement = screen.queryByText(/sign out/i);
        expect(signOutLinkElement).toBeNull();
    })

    test('It should render Sign Out if there is a currentUser', () => {
        renderWithProviders(
            <Navigation/>,
            {
                preloadedState: {
                    user: {
                        currentUser: {}
                    }
                }
            }
        );
        const signOutLinkElement = screen.getByText(/sign out/i);
        expect(signOutLinkElement).toBeInTheDocument();
        
        // Test something that does not exist
        const signInLinkElement = screen.queryByText(/sign in/i);
        expect(signInLinkElement).toBeNull();
    })

    test('it should render CartDropdown if isCartOpen is true', () => {
        renderWithProviders(
            <Navigation/>,
            {
                preloadedState: {
                    cart: {
                        isCartOpen: true,
                        cartItems: []
                    }
                }
            }
        );

        const cartDropDownTextElement = screen.getByText(/your cart is empty/i);
        expect(cartDropDownTextElement).toBeInTheDocument();
    })

    test('it should not render CartDropdown if isCartOpen is false', () => {
        renderWithProviders(
            <Navigation/>,
            {
                preloadedState: {
                    cart: {
                        isCartOpen: false,
                        cartItems: []
                    }
                }
            }
        );

        const cartDropDownTextElement = screen.queryByText(/your cart is empty/i);
        expect(cartDropDownTextElement).toBeNull();
    });

    test('it should dispatch signOutStart action when clicking on the Sign Out link', async () => {
        const mockDispatch = jest.fn();
        // Whenever useDispatch is called, it will automatically return mockDispatch object.
        jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch);

        // Or we can even use Mock instead of Spy
        // jest.mock('react-redux', () => {
        //     return {
        //         ...jest.requireActual('react-redux'),
        //         useDispatch: () => (mockDispatch)
        //     }
        // })
        renderWithProviders(<Navigation/>, {
            preloadedState: {
                user: {
                    currentUser: {}
                }
            }
        });

        const signOutLinkElement = screen.getByText(/sign out/i);
        expect(signOutLinkElement).toBeInTheDocument();
        await fireEvent.click(signOutLinkElement);
        expect(mockDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith({type: USER_ACTION_TYPES.SIGN_OUT_START});

        mockDispatch.mockClear();
    })
})
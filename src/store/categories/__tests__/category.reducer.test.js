import { categoriesReducer, INITIAL_STATE } from "../category.reducer";

import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from "../category.action";

describe('Category Reducer tests', () => {
    test('fetchCategoriesStart', () => {
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: true
        }
        expect(categoriesReducer(INITIAL_STATE, fetchCategoriesStart())).toEqual(expectedState);
    })

    test('fetchCategoriesSuccess', () => {
        const mockCategoriesArray = [
            {
                title: 'mens', 
                items: [
                    {id: 1, name: 'Product 1', imageUrl: 'asdads', price: 20},
                    {id: 2, name: 'Product 2', imageUrl: 'asdads1', price: 70}
                ]
            },
            {
                title: 'womens', 
                items: [
                    {id: 3, name: 'Product 3', imageUrl: 'asdads', price: 20},
                    {id: 4, name: 'Product 4', imageUrl: 'asdads1', price: 70}
                ]
            }
        ];
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            categoriesArray: mockCategoriesArray
        }
        expect(categoriesReducer(INITIAL_STATE, fetchCategoriesSuccess(mockCategoriesArray))).toEqual(expectedState);
    })

    test('fetchCategoriesFailed', () => {
        const mockError = new Error('test Error');
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            error: mockError 
        }
        expect(categoriesReducer(INITIAL_STATE, fetchCategoriesFailed(mockError))).toEqual(expectedState);
    })
})
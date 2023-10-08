import { selectCategoriesIsLoading, selectCategoriesMap, selectCategoriesArray } from "../category.selector";

const mockState = {
    categories: {
        categoriesArray: [
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
                    {id: 3, name: 'Product 3', imageUrl: 'asdad1321s', price: 50},
                    {id: 4, name: 'Product 4', imageUrl: 'asdad24142s1', price: 90}
                ]
            }
        ],
        isLoading: false,
        error: null
    }
}

describe('Categories selector test', () => {
    test('selectCategoriesArray should return categoriesData', () => {
        const categoriesArray = selectCategoriesArray(mockState);
        expect(categoriesArray).toEqual(mockState.categories.categoriesArray)
    })

    test('selectCategoriesMap should convert an array into an appropriate map', () => {
        const categoriesMap = selectCategoriesMap(mockState);
        expect(categoriesMap).toEqual({
            'mens': [
                {id: 1, name: 'Product 1', imageUrl: 'asdads', price: 20},
                {id: 2, name: 'Product 2', imageUrl: 'asdads1', price: 70}
            ],
            'womens': [
                {id: 3, name: 'Product 3', imageUrl: 'asdad1321s', price: 50},
                {id: 4, name: 'Product 4', imageUrl: 'asdad24142s1', price: 90}
            ]
        })
    })

    test('selectCategoriesIsLoading should return isLoading state', () => {
        const categoriesIsLoading = selectCategoriesIsLoading(mockState);
        expect(categoriesIsLoading).toEqual(mockState.categories.isLoading)
    })
})
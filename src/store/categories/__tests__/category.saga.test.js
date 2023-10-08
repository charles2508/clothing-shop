import { testSaga,expectSaga } from 'redux-saga-test-plan';
import { fetchCategoriesAsync, onFetchCategories, categoriesSaga } from '../categories.saga'; 
import { call } from 'redux-saga/effects';
import { CATEGORIES_ACTION_TYPE } from '../category.types';
import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from '../category.action';
import { throwError } from 'redux-saga-test-plan/providers';

// SAGA = GENERATOR
describe('category sagas', () => {
    test('categoriesSaga', () => {
       testSaga(categoriesSaga)
        .next()
        .all([call(onFetchCategories)])
        .next()
        .isDone()
    })

    test('onFetchCategories saga', () => {
        testSaga(onFetchCategories)
         .next()
         .takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync)
         .next()
         .isDone()
    })

    test('fetchCategoriesAsync on success', () => {
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

        return expectSaga(fetchCategoriesAsync)
                .provide([
                    [call(getCategoriesAndDocuments), mockCategoriesArray]
                ])
                .put(fetchCategoriesSuccess(mockCategoriesArray))
                .run();
    })

    test('fetchCategoriesAsync on fail', () => {
        const mockError = new Error('Fail to get categories and documents.')
        return expectSaga(fetchCategoriesAsync)
            .provide([
                [call(getCategoriesAndDocuments), throwError(mockError)]
            ])
            .put(fetchCategoriesFailed(mockError))
            .run()
    })
})

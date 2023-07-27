import { takeLatest, all, call, put } from "redux-saga/effects"; // All of these functions work with an Effect.
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

// NOTE: Syntax in Generator/ SAGA
// 1. await <=> yeild (pause everything until the statement finishes)
// 1. await fn(arg)<=> yield call(fn, arg)
// 2. dispatch <=> put

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments);
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch(error) {
        yield put(fetchCategoriesFailed(error));
    }    
}

export function* onFetchCategories() {
    console.log('SAGA');
    yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}


export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}







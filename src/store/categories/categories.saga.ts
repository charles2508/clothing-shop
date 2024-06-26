// import { takeLatest, all, call, put } from "redux-saga/effects"; // All of these functions work with an Effect.
import { takeLatest, all, call, put } from "typed-redux-saga/macro"; // All of these functions work with an Effect.
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

// NOTE: Syntax in Generator/ SAGA (Generator = SAGA)
// 1. await <=> yeild (pause everything until the statement finishes)
// 1. await fn(arg)<=> yield* call(fn, arg)
// 2. dispatch <=> put

// When using React: use yield*
// When using Typescript: use yield**

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments);
        yield* put(fetchCategoriesSuccess(categoriesArray));
    } catch(error) {
        yield* put(fetchCategoriesFailed(error as Error));
    }    
}

export function* onFetchCategories() {
    yield* takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}


export function* categoriesSaga() {
    yield* all([call(onFetchCategories)]);
}







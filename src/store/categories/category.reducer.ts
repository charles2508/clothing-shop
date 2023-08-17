import { fetchCategoriesStart, fetchCategoriesFailed, fetchCategoriesSuccess } from "./category.action";
import { Category } from "./category.types";
import { AnyAction } from "redux";

export type CategoriesState = {
    readonly categoriesArray: Category[];
    readonly isLoading: Boolean;
    readonly error: Error | null;
}

export const INITIAL_STATE: CategoriesState = {
    categoriesArray: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = INITIAL_STATE, action: AnyAction): CategoriesState => {
    //const { type, payload } = action;
    if (fetchCategoriesStart.match(action)) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (fetchCategoriesSuccess.match(action)) {
        return {
            ...state,
            isLoading: false,
            categoriesArray: action.payload
        }
    }

    if (fetchCategoriesFailed.match(action)) {
        return {
            ...state,
            isLoading: false,
            error: action.payload
        }
    }

    return state;
    // switch(action.type) {
    //     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
    //         return {
    //             ...state,
    //             isLoading: true,
    //         }
    //     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
    //         return {
    //             ...state,
    //             isLoading: false,
    //             categoriesArray: action.payload
    //         }
    //     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
    //         return {
    //             ...state,
    //             isLoading: false,
    //             error: action.payload
    //         }
    //     default:
    //         return state;
}
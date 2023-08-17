import { createSelector } from "reselect";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";
import { RootState } from "../store";

const selectCategoryReducer = (state: RootState): CategoriesState => {
    return state.categories;
}

const selectCategoriesArray = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        return categoriesSlice.categoriesArray;
    }
);

export const selectCategoriesMap = createSelector(
    [selectCategoriesArray],
    (categoriesArray): CategoryMap => {
        return categoriesArray.reduce((accumulator, category) => {
            accumulator[category.title.toLowerCase()] = category.items;
            return accumulator;
        }, {} as CategoryMap);
    }
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)
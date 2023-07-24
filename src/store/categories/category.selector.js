import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
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
    (categoriesArray) => {
        return categoriesArray.reduce((accumulator, category) => {
            accumulator[category.title.toLowerCase()] = category.items;
            return accumulator;
        }, {});
    }
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)
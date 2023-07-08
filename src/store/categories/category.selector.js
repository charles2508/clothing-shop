import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
    return state.categories;
}

const selectCategoriesArray = createSelector(
    [selectCategoryReducer],
    (categories) => {
        return categories.categoriesArray;
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
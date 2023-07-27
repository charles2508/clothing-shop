import { combineReducers } from "redux";
// import { combineReducers } from "@reduxjs/toolkit"; Use this one if we're using Redux Toolkit
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
})
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { Routes, Route } from 'react-router-dom';
import { createCategoryAction, fetchCategoriesAsync, fetchCategoriesStart } from '../../store/categories/category.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Shop = () => {
    const dispatch = useDispatch();
    // Dispatch to Categories Reducer
    useEffect(() => {
        // Before using Redux-Thunk
        // const getCategoriesMap = async () => {
        //     const categoriesArray = await getCategoriesAndDocuments();
        //     //console.log(categoriesMap);
        //     dispatch(createCategoryAction(categoriesArray));
        // };
        // getCategoriesMap();

        //Using redux-thunk
        //dispatch(fetchCategoriesAsync());

        // Using redux-saga
        dispatch(fetchCategoriesStart());
    }, [])

    return(
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<Category/>}/>
        </Routes>
    )
}

export default Shop;
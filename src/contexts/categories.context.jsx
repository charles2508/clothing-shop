import { createContext, useState, useEffect } from "react";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import SHOP_DATA from "../shop-data";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesContextProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA);
    }, []);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            console.log(categoriesMap);
            setCategoriesMap(categoriesMap);
        };
        getCategoriesMap();
    }, [])
    const value = { categoriesMap }
    
    return(
        <CategoriesContext.Provider value={value}>{ children }</CategoriesContext.Provider>
    )
}
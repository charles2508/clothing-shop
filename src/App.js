import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getCategoriesAndDocuments } from "./utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { createUserAction } from "./store/user/user.action";
import { createCategoryAction } from "./store/categories/category.action";

const App = () => {  
  const dispatch = useDispatch();
  
  // dispatch to User Reducer
  useEffect(() => {
    const unsubcribe = onAuthStateChangedListener((user) => {
        if (user) {
            createUserDocumentFromAuth(user);
        }
        dispatch(createUserAction(user));
    });
    return unsubcribe;
  }, []);

  // Dispatch to Categories Reducer
  useEffect(() => {
    const getCategoriesMap = async () => {
        const categoriesMap = await getCategoriesAndDocuments();
        //console.log(categoriesMap);
        dispatch(createCategoryAction(categoriesMap));
    };
    getCategoriesMap();
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home />}/>
        <Route path='auth' element={<Authentication/>}/>
        <Route path='shop/*' element={<Shop/>}/>
        <Route path='checkout' element={<Checkout/>}/>
      </Route>
    </Routes>
  );
}

export default App;
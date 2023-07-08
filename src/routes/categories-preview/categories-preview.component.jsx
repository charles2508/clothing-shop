import { useContext, Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesContext } from "../../contexts/categories.context";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector((state) => selectCategoriesMap(state) )
    return(
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => {
                    return(
                        <CategoryPreview key={title} title={title} products={categoriesMap[title]}/>
                    )
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;
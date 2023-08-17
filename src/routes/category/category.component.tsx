import './category.styles.scss'
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { Fragment } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import Spinner from '../../components/spinner/spinner.component';
import { RootState } from '../../store/store';

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector((state: RootState) => selectCategoriesMap(state) )
    const categoriesIsLoading = useSelector((state: RootState) => selectCategoriesIsLoading(state))
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [categoriesMap, category])
    
    return(
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {categoriesIsLoading ?
                 <Spinner/> : 
                <div className='category-container'>
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))
                    }
                </div>
            }
        </Fragment>
    )
}

export default Category;
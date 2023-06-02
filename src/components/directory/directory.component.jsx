import './directory.styles.scss';
import CategoryItem from '../category-item/category-item.component';

const Directory = ({ categories }) => {

    return(
        <div className="directory-container">
            {categories.map((category) => {
                // Same as: const { id, title } = category;
                return (
                    <CategoryItem key={category.id} category={category}/>
                )
            })}
        </div>
    )

}

export default Directory;
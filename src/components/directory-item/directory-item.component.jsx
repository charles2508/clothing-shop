import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles';
import { Link } from 'react-router-dom';

const DirectoryItem = ({ category }) => {
    const { title, imageUrl, route } = category; 
    return (
        <DirectoryItemContainer>
            <BackgroundImage imageUrl={imageUrl}/>
            <Body to={route}>
                <h2>{title}</h2>
                <p>Shop now</p>
            </Body>
        </DirectoryItemContainer> 
    )
}

export default DirectoryItem;
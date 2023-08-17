import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import { selectCurrentUser } from "../../store/user/user.selector";
//import { CartContext } from "../../contexts/cart.context";
import { SignOutFromAccount } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import './navigation.styles'
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles";
import { useDispatch } from "react-redux";
import { createSignOutStartAction } from "../../store/user/user.action";
import { RootState } from "../../store/store";

const Navigation = () => {
    const currentUser = useSelector((state: RootState) => selectCurrentUser(state));
    //const { isCartOpen } = useContext(CartContext);
    const isCartOpen = useSelector((state: RootState) => selectIsCartOpen(state));
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(createSignOutStartAction());
    }

    return(
        <Fragment>
            <NavigationContainer className="navigation">
                <LogoContainer as={Link} className='logo-container' to='/'>
                    <CrwnLogo className="logo"/>
                </LogoContainer>
                <NavLinks className="nav-links-container">
                    <NavLink className="nav-link" to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={handleSignOut}>SIGN OUT</NavLink>
                        ) : (
                        <NavLink className="nav-link" to='/auth'>
                            SIGN IN
                        </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropDown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;
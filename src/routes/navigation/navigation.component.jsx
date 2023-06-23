import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { SignOutFromAccount } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import './navigation.styles.jsx'
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles";

const Navigation = () => {
    const currentUser = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    const handleSignOut = async () => {
        await SignOutFromAccount();
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
                            <NavLink className="nav-link" onClick={handleSignOut}>SIGN OUT</NavLink>
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
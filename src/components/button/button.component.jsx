import { BaseButton, GoogleSignInButton, InvertedButton } from "./button-styles";

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
    if (buttonType === BUTTON_TYPE_CLASSES.base) return BaseButton
    if (buttonType === BUTTON_TYPE_CLASSES.google) return GoogleSignInButton
    if (buttonType === BUTTON_TYPE_CLASSES.inverted) return InvertedButton;
}

const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);

    return(
        <CustomButton {...otherProps}>
            {children}
        </CustomButton>
    )
}

export default Button;
import { useState, useContext, FormEvent, ChangeEvent } from "react";
import { signInWithEmailAndPasswordFromApi, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { createEmailSignInStartAction, createGoogleSignInStartAction } from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {

    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;
    //console.log(context);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(createEmailSignInStartAction(email, password));
            resetFormFields();
        } catch(error) {
            console.log('user sign in failed', error);
        }
    }

    const signInWithGoogle = async () => {
        dispatch(createGoogleSignInStartAction());
    }

    return(
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and address</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email}/>

                <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password}/>
                <div className="buttons-container">
                    <Button type='submit'>SIGN IN</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
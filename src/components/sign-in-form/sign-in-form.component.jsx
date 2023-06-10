import { useState, useContext } from "react";
import { signInWithEmailAndPasswordFromApi, createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;
    //console.log(context);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await signInWithEmailAndPasswordFromApi(email, password); //return user credential but without displayName field
            resetFormFields();
        } 
        catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
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
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
import { ChangeEvent, FormEvent, useState} from "react";
import { createUserAuthFromEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { createSignUpStartAction } from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("password do not match");
            return;
        }
        try {
            dispatch(createSignUpStartAction(email, password, displayName));
            resetFormFields();
        } catch(error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered error', error);
            }
        }
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and address</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type='text'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />

                <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email}/>

                <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password}/>

                <FormInput label="Confirm Password" type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;
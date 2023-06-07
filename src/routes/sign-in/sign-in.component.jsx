import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils.js';
import { useEffect } from 'react';
import { getRedirectResult  } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';


const SignIn = () => {
    useEffect(() => {
        const asyncFn = async () => {
            const response = await getRedirectResult(auth);
            if (response) {
                await createUserDocumentFromAuth(response.user);
            }
        }
        asyncFn();
    }, []);


    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }


    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}> Sign In With Google PopUp</button>
            <button onClick={signInWithGoogleRedirect}> Sign In With Google Redirect</button>
            <SignUpForm/>
        </div>
    )
}

export default SignIn;
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore , doc, getDoc, setDoc} from 'firebase/firestore';

// Get firebase configuration object the references to the Firebase console.
const firebaseConfig = {
    apiKey: "AIzaSyDOIK_nJYgYHsIlUVefuG7GA6qB3PvcXrU",
    authDomain: "crwn-clothing-db-2f9e8.firebaseapp.com",
    projectId: "crwn-clothing-db-2f9e8",
    storageBucket: "crwn-clothing-db-2f9e8.appspot.com",
    messagingSenderId: "11441904256",
    appId: "1:11441904256:web:d0aa88c81ef91816ac2465"
};


  
  // Initialize Firebase App from firebase configuration
const firebaseApp = initializeApp(firebaseConfig); //initializeApp is an SDK that provides a list of libraries that could be used (e.g., authentication, CRUD, etc)

// Set up authentication
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(); // singleton object
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Set up firestore database instance
export const database = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocReference = doc(database, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocReference);
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocReference, {
                displayName,
                email,
                createdAt
            });
        }
        catch (error) {
            console.log('error creating the user ', error.message);
        }
    }
    return userDocReference;
}


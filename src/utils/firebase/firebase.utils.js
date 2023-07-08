import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore, 
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

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
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(); // singleton object
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const createUserAuthFromEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInWithEmailAndPasswordFromApi = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}
export const SignOutFromAccount = () => signOut(auth);

// Set up firestore database instance
export const database = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;

    const userDocReference = doc(database, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocReference);
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocReference, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        }
        catch (error) {
            console.log('error creating the user ', error.message);
        }
    }
    return userDocReference;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(database, collectionKey);
    const batch = writeBatch(database);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })
    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(database, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    // const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapShot) => {
    //     const { title, items } = docSnapShot.data();
    //     accumulator[title.toLowerCase()] = items;
    //     return accumulator;
    // }, {});
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

// Observer pattern:
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

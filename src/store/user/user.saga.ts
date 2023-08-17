import { takeLatest, all, call, put } from "typed-redux-saga/macro"
import { createSignInSuccessAction, creasteSignInFailedAction, createSignOutSuccessAction, EmailSignInStart, SignUpStart } from "./user.action";
import { AdditionalInfo, SignOutFromAccount, createUserAuthFromEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInWithEmailAndPasswordFromApi, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { USER_ACTION_TYPES } from "./user.types";
import { User } from "firebase/auth";

export function* getSnapshotFromUserAuth(userAuth: User, additionalInfo?: AdditionalInfo){
    try {
        // Create or Get (if exists) user Document from Auth
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalInfo);
        if (userSnapshot) {
            yield* put(createSignInSuccessAction({id: userSnapshot.id, ...userSnapshot.data()}));
        }
    } catch (error) {
        yield* put(creasteSignInFailedAction(error as Error));
    }
}

// Entrance point for CHECK_USER_SESSION. Means that when CHECK_USER_SESSION is dispatched, isUserAuthenticated will be called
export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth); 
    } catch(error) {
        yield* put(creasteSignInFailedAction(error as Error));
    }
}

// Entrance point for GOOGLE_SIGN_IN
export function* onGoogleSignIn() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch(error) {
        yield* put(creasteSignInFailedAction(error as Error));
    }
}

// Entrance point for EMAIL_SIGN_IN
export function* onEmailSignIn() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* signInWithEmail(action: EmailSignInStart) {
    try {
        const { email, password } = action.payload;
        const userCredential = yield* call(signInWithEmailAndPasswordFromApi, email, password);
        if (userCredential) {
            yield* call(getSnapshotFromUserAuth, userCredential.user);
        }
    } catch(error) {
        yield* put(creasteSignInFailedAction(error as Error));
    }
}

// Entrance point for SIGN_OUT
export function* onSignOut() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* signOut() {
    try {
        yield* call(SignOutFromAccount);
        yield* put(createSignOutSuccessAction());
    } catch(error) {
        yield* put(creasteSignInFailedAction(error as Error));
    }
}

// Entrance point for Sign Up
export function* onSignUp() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* signUp(action: SignUpStart) {
    try {
        const { email, password, displayName } = action.payload;
        const userCredential = yield* call(createUserAuthFromEmailAndPassword, email, password);
        if (userCredential) {
            yield* call(getSnapshotFromUserAuth, userCredential.user, { displayName });
        }
    } catch(error) {
        yield* put(creasteSignInFailedAction(error as Error));
    }
}

export function* userSaga(){
    yield* all([call(onCheckUserSession), call(onGoogleSignIn), call(onEmailSignIn), call(onSignOut), call(onSignUp)])
}


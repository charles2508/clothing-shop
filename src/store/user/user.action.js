import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const createUserAction = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const createCheckUserSessionAction = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const createSignUpStartAction = (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName });

export const createGoogleSignInStartAction = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const createEmailSignInStartAction = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const createSignOutSuccessAction = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const createSignOutStartAction = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const createSignInSuccessAction = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const creasteSignInFailedAction = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
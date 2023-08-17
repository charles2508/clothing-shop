import { AnyAction } from "redux";
import { creasteSignInFailedAction, createSignInSuccessAction, createSignOutSuccessAction } from "./user.action";
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
    readonly currentUser: null | UserData;
    readonly isLoading: Boolean;
    readonly error: null | Error
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {
    //const { type, payload } = action;
    // Typescript:
    if (createSignInSuccessAction.match(action)) {
        return {
            ...state,
            currentUser: action.payload
        }
    }

    if (creasteSignInFailedAction.match(action)) {
        return {
            ...state,
            error: action.payload
        }
    }

    if (createSignOutSuccessAction.match(action)) {
        return {
            ...state,
            currentUser: null
        }
    }
    return state;

    // Javascript
    // switch(type) {
    //     case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
    //         return {
    //             ...state,
    //             currentUser: payload
    //         }
    //     case USER_ACTION_TYPES.SIGN_IN_FAILED:
    //         return {
    //             ...state,
    //             error: payload
    //         }
    //     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
    //         return {
    //             ...state,
    //             currentUser: null
    //         }
    //     default:
    //         return state;
    // }
}
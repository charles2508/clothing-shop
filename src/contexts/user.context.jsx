import { createContext, useState, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
    currentUser: null,
    //setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

// The value inside UserContext.Provider is the one returned when calling useContext(UserContext);
// This UserProvider is just an alias component for <UserContext.Provider></UserContext.Provider>
export const UserProvider = ({ children }) => {
    //const [currentUser, setCurrentUser] = useState(null);

    const [state, dispatch] = useReducer(userReducer, { currentUser: null })
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
    }

    const value = state.currentUser;
    useEffect(() => {
        const unsubcribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubcribe;
    }, [])

    return(
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}


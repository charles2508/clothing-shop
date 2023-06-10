import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});
// The value inside UserContext.Provider is the one returned when calling useContext(UserContext);
// This UserProvider is just an alias component for <UserContext.Provider></UserContext.Provider>
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = currentUser;
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


import React, { createContext, useContext, useState } from 'react';

// Handles the state for sign-in operations.
const SignInContext = createContext();

export const useSignIn = () => useContext(SignInContext);

export const SignInProvider = ({ children }) => {
    const [isSignInVisible, setIsSignInVisible] = useState(false);
    const [isLoginVisible, setIsLoginVisible] = useState(false);

    const showSignIn = () => {
        setIsSignInVisible(true);
        setIsLoginVisible(false);
    };

    const hideSignIn = () => setIsSignInVisible(false);

    const showLogin = () => {
        setIsLoginVisible(true);
        setIsSignInVisible(false);
    };

    const hideLogin = () => setIsLoginVisible(false);

    return (
        <SignInContext.Provider value={{ isSignInVisible, showSignIn, hideSignIn, isLoginVisible, showLogin, hideLogin }}>
            {children}
        </SignInContext.Provider>
    );
};

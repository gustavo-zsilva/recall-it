import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import firebase, { auth } from '../lib/firebase';
import { formatUser } from '../utils/formatUser';

export const AuthContext = createContext({} as AuthContextProps);

type User = {
    name: string,
    email: string,
    isEmailVerified: boolean,
    photoUrl: string,
    uid: string,
}

interface AuthContextProps {
    user: User,
    isUserLoading: boolean,
    signUpWithEmail: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
    loginWithEmail: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
    signInWithGoogle: () => Promise<firebase.auth.UserCredential>,
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(false);

    function signUpWithEmail(email: string, password: string) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function loginWithEmail(email: string, password: string) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return auth.signInWithPopup(provider);
    }

    useEffect(() => {
        const authUnsubscribe = auth.onAuthStateChanged(user => {
            setIsUserLoading(true);

            if (user) {
                const formattedUser = formatUser(user);
                setUser(formattedUser);
                setIsUserLoading(false);
                return;
            }

            setUser(null);
            setIsUserLoading(false);
        })

        return () => {
            authUnsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                isUserLoading,
                signUpWithEmail,
                loginWithEmail,
                signInWithGoogle,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
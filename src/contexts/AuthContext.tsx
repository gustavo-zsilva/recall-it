import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { setCookie } from 'nookies';
import Router from 'next/router';
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
    isAuthenticated: boolean,
    isUserLoading: boolean,
    signUpWithEmail: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
    loginWithEmail: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
    signInWithGoogle: () => Promise<firebase.auth.UserCredential>,
    signOut: () => Promise<void>,
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const isAuthenticated = !!user;

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

    function signOut() {
        return auth.signOut();
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

        const tokenUnsubscribe = auth.onIdTokenChanged(async user => {
            setIsUserLoading(true);

            if (user) {
                const token = await user.getIdToken();
                setCookie(null, 'nextauth.token', token, { encode: value => value })
                setCookie(null, 'nextauth.uid', user.uid, { encode: value => value })
                return;
            }

            Router.push('/login')
            setCookie(null, 'nextauth.token', null)
            setCookie(null, 'nextauth.uid', null)
        })

        return () => {
            authUnsubscribe();
            tokenUnsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isUserLoading,
                signUpWithEmail,
                loginWithEmail,
                signInWithGoogle,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
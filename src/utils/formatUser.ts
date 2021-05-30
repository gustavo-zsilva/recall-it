import firebase from '../lib/firebase';

export function formatUser(user: firebase.User) {
    const formattedUser = {
        name: user.displayName,
        email: user.email,
        isEmailVerified: user.emailVerified,
        photoUrl: user.photoURL,
        uid: user.uid,
    }

    return formattedUser;
}
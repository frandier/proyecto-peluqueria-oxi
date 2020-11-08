import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { startLoading, finishLoading, setError } from './ui';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName, null));

                dispatch(finishLoading());
            })
            .catch(e => {
                if (e.message === "The password is invalid or the user does not have a password.") {
                    dispatch(setError("Contraseña incorrecta"));
                } else if (e.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
                    dispatch(setError("Usuario no encontrado"));
                }
                dispatch(finishLoading());
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: name});

                dispatch(
                    login(user.uid, user.displayName, null)
                );
            })
            .catch(e => {
                dispatch(setError("Correo electronico ingresado ya esta registrado"));
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName, null)
                )
            });
    }
}


export const login = (uid, displayName, admin) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        admin
    }
});

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout());
    }
};

export const logout = () => ({
    type: types.logout
});
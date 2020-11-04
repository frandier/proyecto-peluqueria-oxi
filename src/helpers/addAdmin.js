// import { functions } from "../firebase/firebase-config";
import {firebase} from "../firebase/firebase-config";

export const addAdmin = (correo) => {
    console.log(correo);
    const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
    addAdminRole({ email: correo }).then(function (result) {
        console.log(result);
    }).catch(function (error) {
        console.log(error);
    });
}
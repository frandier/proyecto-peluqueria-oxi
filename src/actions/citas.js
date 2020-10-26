import { db } from "../firebase/firebase-config"
import { loadCitas } from "../helpers/loadCitas";
import { types } from "../types/types";


export const createNewCita = (servicio, empleado, dia, hora) => {
    return async (dispatch, getState) => {

        const {name:cliente} = getState().auth;
        
        const newCita = {
            servicio,
            empleado,
            dia,
            hora,
            cliente
        }

        await db.collection('citas').add(newCita);
    }
}

export const startLoadingCitas = () => {
    return async (dispatch) => {
        const citas = await loadCitas();
        dispatch(setCitas(citas));
    }
}

export const setCitas = (citas) => ({
    type: types.citasLoad,
    payload: citas
});
import { db } from "../firebase/firebase-config"
import { loadServicios } from "../helpers/loadServicios";
import { types } from "../types/types";

export const createNewServicio = (nombre, area, precio) => {
    return async(dispatch) => {
        
        const newServicio = {
            nombre,
            area,
            precio
        }

        await db.collection('servicios').add(newServicio); 
    }
}


export const startLoadingServicios = () => {
    return async(dispatch) => {
        const servicios = await loadServicios();
        dispatch(setServicios(servicios));
    }
}

export const setServicios = (servicios) => ({
    type: types.serviciosLoad,
    payload: servicios
})
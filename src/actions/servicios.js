import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config"
import { loadServicios } from "../helpers/loadServicios";
import { types } from "../types/types";

export const createNewServicio = (nombre, area, precio, url) => {
    return async(dispatch) => {
        
        const imageUrl = url[0];

        const newServicio = {
            nombre,
            area,
            precio,
            imageUrl,
        }
        const doc = await db.collection('servicios').add(newServicio); 
        dispatch(addNewServicio(doc.id, newServicio))
        Swal.fire('Guardado', 'Se ha agregado un nuevo servicio', 'success');
    }
}

export const addNewServicio = (id, servicio) => ({
    type: types.serviciosAddNew,
    payload: {
        id, ...servicio
    }
})

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

export const startDeleting = (id) => {
    return async (dispatch) => {
        await db.doc(`servicios/${id}`).delete();
        dispatch(deleteServicio(id))
    }
}

export const deleteServicio = (id) => ({
    type: types.serviciosDelete,
    payload: id
});
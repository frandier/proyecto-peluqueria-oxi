import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { loadCitas } from "../helpers/loadCitas";
import { types } from "../types/types";

// Acción que crea una nueva cita y a almacena en la db
export const createNewCita = (servicio, empleado, fecha) => {
    return async (dispatch, getState) => {

        const {name:cliente} = getState().auth;

        const newCita = {
            servicio,
            empleado,
            fecha,
            cliente
        }

        const doc = await db.collection('citas').add(newCita);
        // Dispara la accion que establece la cita almacenada en la db en el estado de la aplicacion
        dispatch(addNewCita(doc.id, newCita));
        Swal.fire('Agendado', 'Se ha agendado su cita', "success");
    }
}

// Acción que establece una nueva cita creada en el estado de la aplicacion
export const addNewCita = (id, cita) => ({
    type: types.citasAddNew,
    payload: {
        id, ...cita
    }
})

// Accíon que hace la carga de las citas desde la bd y se la envia a la accion encargada de cargar las notas cuando se inicia la aplicación
export const startLoadingCitas = () => {
    return async (dispatch) => {
        const citas = await loadCitas();
        dispatch(setCitas(citas));
    }
}

// Acción que carga notas cuando se inicia la aplicación
export const setCitas = (citas) => ({
    type: types.citasLoad,
    payload: citas
});

// // Acción que refresca lo la cita que cambio
// export const refreshCita = (id, cita) => ({
//     type: types.citasUpdated,
//     payload: {
//         id, cita
//     }
// });

// Accion que prepara la cita a eliminar
export const startDeleting = (id) => {
    return async (dispatch) => {
        await db.doc(`citas/${id}`).delete();
        dispatch(deleteCita(id))
    }
}

export const deleteCita = (id) => ({
    type: types.citasDelete,
    payload: id
});
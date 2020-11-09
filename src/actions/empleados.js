import Swal from 'sweetalert2';

import { db } from "../firebase/firebase-config";
import { loadEmpleados } from "../helpers/loadEmpleados";
import { types } from "../types/types";

export const createNewEmpleado = (nombre, apellido, especialidad, descripcion, url) => {
    return async(dispatch) => {

        const imgUrl = url[0];

        const newEmpleado = {
            nombre, 
            apellido, 
            especialidad,
            descripcion,
            imgUrl
        }

        const doc = await db.collection('empleados').add(newEmpleado);

        dispatch(addNewEmpleado(doc.id, newEmpleado));

        Swal.fire('Guardado', 'Se ha agregado un nuevo empleado', 'success');
    }
}

export const addNewEmpleado = (id, empleado) => ({
    type: types.empleadosAddNew,
    payload: {
        id, empleado
    }
})

export const startLoadingEmpleados = () => {
    return async(dispatch) => {
        const empleados = await loadEmpleados();
        dispatch(setEmpleados(empleados));
    }
}

export const setEmpleados = (empleados) => ({
    type: types.empleadosLoad,
    payload: empleados
})

export const startDeleting = (id) => {
    return async (dispatch) => {
        await db.doc(`empleados/${id}`).delete();
        dispatch(deleteEmpleado(id))
    }
}

export const deleteEmpleado = (id) => ({
    type: types.empleadosDelete,
    payload: id
});
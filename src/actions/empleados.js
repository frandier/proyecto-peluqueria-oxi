import Swal from 'sweetalert2';

import { db } from "../firebase/firebase-config";
import { loadEmpleados } from "../helpers/loadEmpleados";
import { types } from "../types/types";

export const createNewEmpleado = (nombre, apellido, especialidad, url) => {
    return async(dispatch) => {

        const imgUrl = url[0];

        const newEmpleado = {
            nombre, 
            apellido, 
            especialidad,
            imgUrl
        }

        await db.collection('empleados').add(newEmpleado);

        Swal.fire('Guardado', 'Se ha agregado un nuevo empleado', 'success');
    }
}

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
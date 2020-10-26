import { db } from "../firebase/firebase-config"
import { loadEmpleados } from "../helpers/loadEmpleados";
import { types } from "../types/types";



export const createNewEmpleado = (nombre, apellido, especialidad) => {
    return async(dispatch) => {
        const newEmpleado = {
            nombre, 
            apellido, 
            especialidad
        }

        await db.collection('empleados').add(newEmpleado);
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
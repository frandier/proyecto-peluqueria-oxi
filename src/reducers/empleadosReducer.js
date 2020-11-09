import { types } from "../types/types";


const initialState = {
    empleados: []
}

export const empleadosReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.empleadosAddNew:
            return {
                ...state,
                empleados: [action.payload, ...state.empleados]
            }

        case types.empleadosLoad:
            return {
                ...state,
                empleados: [...action.payload]
            }

        case types.empleadosDelete:
            return {
                ...state,
                empleados: state.empleados.filter(empleado => empleado.id !== action.payload)
            }

        default:
            return state;
    }
}
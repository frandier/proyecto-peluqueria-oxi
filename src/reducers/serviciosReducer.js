import { types } from "../types/types";


const initalState = {
    servicios: []
}

export const serviciosReducer = (state = initalState, action) => {
    switch (action.type) {

        case types.serviciosAddNew:
            return {
                ...state,
                servicios: [action.payload, ...state.servicios]
            }

        case types.serviciosLoad:
            return {
                ...state,
                servicios: [...action.payload]
            }

        case types.serviciosDelete:
            return {
                ...state,
                servicios: state.servicios.filter(servicio => servicio.id !== action.payload)
            }

        default:
            return state;
    }
}
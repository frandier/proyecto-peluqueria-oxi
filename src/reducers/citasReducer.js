import { types } from "../types/types";

const initialState = {
    citas: []
}

export const citasReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.citasAddNew:
            return {
                ...state,
                citas: [action.payload, ...state.citas]
            }

        case types.citasLoad:
            return {
                ...state,
                citas: [...action.payload]
            }

        case types.citasDelete:
            return {
                ...state,
                citas: state.citas.filter(cita => cita.id !== action.payload)
            }

        default:
            return state;
    }
}
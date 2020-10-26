import { types } from "../types/types";


const initalState = {
    servicios: []
}

export const serviciosReducer = (state = initalState, action) => {
    switch (action.type) {

        case types.serviciosLoad:
            return {
                ...state,
                servicios: [...action.payload] 
            }

        default:
            return state;
    }
}
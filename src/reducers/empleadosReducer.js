import { types } from "../types/types";


const initialState = {
    empleados: []
}

export const empleadosReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case types.empleadosLoad:
            return {
                ...state,
                empleados: [...action.payload]
            }
    
        default:
            return state;
    }
}
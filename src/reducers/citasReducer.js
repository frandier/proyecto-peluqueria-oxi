import { types } from "../types/types";

const initialState = {
    citas: []
}

export const citasReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case types.citasLoad:
            return {
                ...state,
                citas: [...action.payload]
            }
    
        default:
            return state;
    }
}
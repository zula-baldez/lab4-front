import {defaultState, FETCH_REQUEST, FETCH_SUCCESS, UPDATE_R} from "../state/state.js";


export const reducer = (state = defaultState, action) => {

    switch (action.type) {
        case FETCH_REQUEST: {
            return {
                ...state,
            }
        }
        case FETCH_SUCCESS: {
            action.table.reverse()

            return {
                ...state,
                table: action.table,
                pages: action.pages
            }
        }
        case UPDATE_R: {
            return {
                ...state,
                r: action.R
            }
        }
        default:
            return {...state}
    }
}
import {SET_SEQ, SET_TIMESTAMP, SET_USER_ID, SET_USER_NAME} from '../actions'

export default function (state = {ID: null, name: null, seq: 0, t: 0}, action) {
    switch (action.type) {
        case SET_USER_ID:
            return {
                ...state,
                ID: action.value
            }
        case SET_USER_NAME:
            return {
                ...state,
                name: action.value
            }
        case SET_SEQ:
            return {
                ...state,
                seq: action.value
            }
        case SET_TIMESTAMP:
            return {
                ...state,
                t: action.value
            }
        default:
            return state
    }
}

import {ADD_MSG} from '../actions'

export default function (state = [], action) {
    switch (action.type) {
        case ADD_MSG:
            return [
                ...state,
                action.value
            ]
        default:
            return state
    }
}
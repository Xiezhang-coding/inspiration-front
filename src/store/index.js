import {createStore, combineReducers} from 'redux'
import user from './user'
import msg from './msg'

export default createStore(combineReducers({
    user,
    msg
}))

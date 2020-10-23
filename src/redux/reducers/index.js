import counterReducer from './counterReducer'
import userReducer from './userReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    user : userReducer,
    counter : counterReducer
})

export default rootReducer
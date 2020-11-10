import { BOOK_ERROR, BOOK_LOADED, BOOK_LOADING } from "../actionTypes"

const data = {
    loading : false,
    message : null,
    error : null
}

const BookReducer = ( state=data, action) => {
    switch(action.type){
        case BOOK_LOADING :
            return {loading : true, ...state}
        case BOOK_LOADED :
            return {loading : false, message : action.payload}
        case BOOK_ERROR : 
            return {...state, loading : false, error : action.payload}
        default :
            return state 
    }
}

export default BookReducer
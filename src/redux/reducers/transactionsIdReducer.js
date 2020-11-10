import { TRX_ERROR, TRX_LOADED, TRX_LOADING } from "../actionTypes"

const data = {
    loading : false,
    data : null,
    error : null
}

const transactionIdReducer = ( state=data, action) => {
    switch(action.type){
        case TRX_LOADING :
            return {loading : true, ...state}
        case TRX_LOADED :
            return {loading : false, data : action.payload}
        case TRX_ERROR : 
            return {...state, loading : false, error : action.payload}
        default :
            return state 
    }
}

export default transactionIdReducer
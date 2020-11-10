import { TRX_FAILED_ERROR, TRX_FAILED_LOADED, TRX_FAILED_LOADING } from "../actionTypes"

const data = {
    loading : false,
    data : null,
    error : null
}

const transactionFailed = ( state=data, action) => {
    switch(action.type){
        case TRX_FAILED_LOADING :
            return {loading : true, data : null}
        case TRX_FAILED_LOADED :
            return {loading : false, data : action.payload}
        case TRX_FAILED_ERROR : 
            return {...state, loading : false, error : action.payload}
        default :
            return state 
    }
}

export default transactionFailed
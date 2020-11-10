const { TRANSACTION_LOADING, TRANSACTION_LOADED, TRANSACTION_ERROR } = require("../actionTypes")

const data = {
    loading : false,
    data : null,
    error : null
}

const transactionReducer = ( state=data, action) => {
    switch(action.type){
        case TRANSACTION_LOADING :
            return {loading : true, data : null}
        case TRANSACTION_LOADED :
            return {loading : false, data : action.payload}
        case TRANSACTION_ERROR : 
            return {...state, loading : false, error : action.payload}
        default :
            return state 
    }
}

export default transactionReducer
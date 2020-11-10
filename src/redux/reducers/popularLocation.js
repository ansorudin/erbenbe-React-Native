const { POPULAR_LOCATION_LOADING , POPULAR_LOCATION_LOADED, POPULAR_LOCATION_ERROR } = require("../actionTypes")

const data = {
    loading : false,
    data : null,
    error : null
}

const popularLocation = (state=data, action) => {
    switch(action.type){
        case POPULAR_LOCATION_LOADING :
            return {loading : true, data : null}
        case POPULAR_LOCATION_LOADED :
            return {loading : false, data : action.payload}
        case POPULAR_LOCATION_ERROR : 
            return {...state, loading : false, error : action.payload}
        default :
            return state
    }
}

export default popularLocation
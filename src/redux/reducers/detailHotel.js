const { HOTELS_DETAIL_LOADING, HOTELS_DETAIL_LOADED, HOTELS_DETAIL_ERROR } = require("../actionTypes")

const data = {
    loading : false,
    data : null,
    error : null
}

const detailHotel = (state=data, action) => {
    switch(action.type){
        case HOTELS_DETAIL_LOADING :
            return {loading : true, data : null}
        case HOTELS_DETAIL_LOADED :
            return {loading : false, data : action.payload}
        case HOTELS_DETAIL_ERROR : 
            return {...state, loading : false, error : action.payload}
        default :
            return state
    }
}

export default detailHotel
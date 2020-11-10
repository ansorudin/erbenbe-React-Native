const { ROOM_DETAIL_LOADED, ROOM_DETAIL_ERROR, ROOM_DETAIL_LOADING } = require("../actionTypes")

const data = {
    loading : false,
    data : null,
    error : null
}

const roomDetailReducer = (state=data, action) => {
    switch(action.type){
        case ROOM_DETAIL_LOADING :
            return {loading : true, data : null}
        case ROOM_DETAIL_LOADED :
            return {loading : false, data : action.payload}
        case ROOM_DETAIL_ERROR : 
            return {...state, loading : false, error : action.payload}
        default :
            return state
    }
}

export default roomDetailReducer
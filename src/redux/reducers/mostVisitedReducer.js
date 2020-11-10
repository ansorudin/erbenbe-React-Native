const { MOST_VISITED_ERROR , MOST_VISITED_LOADED, MOST_VISITED_LOADING } = require("../actionTypes")

const data = {
    loading : false,
    data : null,
    error : null
}

const mostVisitedReducer = (state=data, action) => {
    switch(action.type){
        case MOST_VISITED_LOADING :
            return {loading : true, data : null}
        case MOST_VISITED_LOADED :
            return {loading : false, data : action.payload}
        case MOST_VISITED_ERROR : 
            return {...state, loading : false, error : action.payload}
        default :
            return state
    }
}

export default mostVisitedReducer
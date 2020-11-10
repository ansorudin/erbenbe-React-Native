const {HOTELS_LOADING, HOTELS_LOADED, HOTELS_ERROR, SORT_PRICE_ASC, CHANGE_DATE_FILTER_HOTEL, CHANGE_DATE_END_FILTER_HOTEL} = require("../actionTypes")

const data = {
    loading : false,
    data : null,
    error : null,
    filterDate : '',
    filterEndDate : ''
}

const hotelReducer = (state=data, action) => {
    switch(action.type){
        case HOTELS_LOADING :
            return {...state, loading : true, data : null}
        case HOTELS_LOADED :
            return {...state, loading : false, data : action.payload}
        case HOTELS_ERROR : 
            return {...state, loading : false, error : action.payload}
        case SORT_PRICE_ASC :
            let hotelSorted = [...state.data]
            hotelSorted.sort((a,b) => {
                return a.price - b.price
            })
            return {...state, data : hotelSorted}
        case CHANGE_DATE_FILTER_HOTEL :
            return {...state, filterDate : action.payload}
        case CHANGE_DATE_END_FILTER_HOTEL :
            return {...state, filterEndDate : action.payload} 
        default :
            return state
    }
}

export default hotelReducer
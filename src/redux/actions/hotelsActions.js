import Axios from "axios"
import { apiURL2 } from "../../constant/apiURL"
import { CHANGE_DATE_END_FILTER_HOTEL, CHANGE_DATE_FILTER_HOTEL,HOTELS_DETAIL_LOADED, HOTELS_DETAIL_LOADING, HOTELS_ERROR, HOTELS_LOADED, HOTELS_LOADING, MOST_VISITED_ERROR, MOST_VISITED_LOADED, MOST_VISITED_LOADING, POPULAR_LOCATION_ERROR, POPULAR_LOCATION_LOADED, POPULAR_LOCATION_LOADING, ROOM_DETAIL_ERROR, ROOM_DETAIL_LOADED, ROOM_DETAIL_LOADING, SORT_PRICE_ASC } from "../actionTypes"

export const getAllHotels = (location, startDate, endDate) => {
    return(dispatch) => {
        dispatch({
            type : HOTELS_LOADING
        })

        Axios.get(apiURL2 + '/hotels?startDate=' + startDate + '&endDate=' + endDate + '&location=' + location )
        .then((res) => {
            if(res.data.error){
                dispatch({
                    type : HOTELS_ERROR,
                    payload : res.data.message
                })
            }else {
                dispatch({
                    type : HOTELS_LOADED,
                    payload : res.data.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type : HOTELS_ERROR,
                payload : err.message
            })
        })
    }
}

export const sortHotelByPriceAsc = () => {
    return{
        type : SORT_PRICE_ASC
    }
}

export const getDataById = (id, startDate, endDate) => {
    return(dispatch) => {
        dispatch({
            type : HOTELS_DETAIL_LOADING
        })

        Axios.get(apiURL2 + '/hotels/detail/' + id + '?startdate=' + startDate + '&endDate=' + endDate)
        .then((res) => {
            if(res.data.error){
                dispatch({
                    type : HOTELS_DETAIL_ERROR,
                    payload : res.data.message
                })
            }else{
                dispatch({
                    type : HOTELS_DETAIL_LOADED,
                    payload : res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type : HOTELS_DETAIL_ERROR,
                payload : err.message
            })
        })
    }
}
export const getRoomsById = (id) => {
    return(dispatch) => {
        dispatch({
            type : ROOM_DETAIL_LOADING
        })

        Axios.get(apiURL2 + '/hotels/detail/room/' + id)
        .then((res) => {
            if(res.data.error){
                dispatch({
                    type : ROOM_DETAIL_ERROR,
                    payload : res.data.message
                })
            }else{
                dispatch({
                    type : ROOM_DETAIL_LOADED,
                    payload : res.data.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type : ROOM_DETAIL_ERROR,
                payload : err.message
            })
        })
    }
}

export const getMostVisited = () => {
    return(dispatch) =>{
        dispatch({
            type : MOST_VISITED_LOADING
        })
        Axios.get(apiURL2 + '/hotels/visited')
        .then((res) =>{
            if(res.data.error){
                dispatch({
                    type : MOST_VISITED_ERROR,
                    payload : res.data.message
                })
            }else{
                dispatch({
                    type : MOST_VISITED_LOADED,
                    payload : res.data.mostVisited
                })
            }
        })
        .catch((err) => {
            dispatch({
                type : MOST_VISITED_ERROR,
                payload : err.message
            })
        })
    }
}

export const onChangeDateHotelFilter = (day) =>{
    return{
        type : CHANGE_DATE_FILTER_HOTEL,
        payload : day
    }
}

export const onChangeEndDateHotelFilter = (day) => {
    return{
        type : CHANGE_DATE_END_FILTER_HOTEL,
        payload : day
    }
}

export const getPopularLocation = () => {
    return(dispatch) => {
        dispatch({
            type : POPULAR_LOCATION_LOADING
        })
        Axios.get(apiURL2 + '/hotels/location')
        .then((res) => {
            if(res.data.error){
                dispatch({
                    type : POPULAR_LOCATION_ERROR,
                    payload : res.data.message
                })
            }else{
                dispatch({
                    type : POPULAR_LOCATION_LOADED,
                    payload : res.data.location
                })
            }
        })
        .catch((err) => {
            dispatch({
                type : POPULAR_LOCATION_ERROR,
                payload : err.message
            })
        })
    }
}


import Axios from "axios"
import { apiURL2 } from "../../constant/apiURL"
import {BOOK_CLEAR, BOOK_ERROR, BOOK_LOADED, BOOK_LOADING, TRANSACTION_ERROR, TRANSACTION_LOADED, TRANSACTION_LOADING, TRX_ERROR, TRX_FAILED_ERROR, TRX_FAILED_LOADED, TRX_FAILED_LOADING, TRX_LOADED, TRX_LOADING } from "../actionTypes"

export const getDataTransactions = (token) => {
    return(dispatch) => {
        dispatch({
            type : TRANSACTION_LOADING
        })
        Axios.get(apiURL2 + '/transaction?id=' + token)
        .then((res) => {
            if(res.data.error){
                dispatch({
                    type : TRANSACTION_ERROR,
                    payload : res.data.message
                })
            }else{
                dispatch({
                    type : TRANSACTION_LOADED,
                    payload : res.data.dataTransactions
                })
            }
        })
        .catch((err) => {
            dispatch({
                type : TRANSACTION_ERROR,
                payload : err.message
            })
        })
    }
}

export const getDataTransactionsById = (id) => {
    return(dispatch) => {
        dispatch({
            type : TRX_LOADING
        })

        Axios.get(apiURL2 + '/transaction/by-id/' + id)
        .then((res) => {
            
            if(res.data.error){
                dispatch({
                    type : TRX_ERROR,
                    payload : res.data.message
                })
            }else{
                dispatch({
                    type : TRX_LOADED,
                    payload : res.data.dataTransactionById[0]
                })
            }
        })
        .catch((err) => {
            dispatch({
                type : TRX_ERROR,
                payload : err.message
            })
        })
    }
}

export const getDataFailed = (id) => {
    return(dispatch) =>{
        dispatch({
            type : TRX_FAILED_LOADING
        })
        Axios.get(apiURL2 + '/transaction/failed?id=' + id)
        .then((res) => {
            if(res.data.error){
                dispatch({
                    type : TRX_FAILED_ERROR,
                    payload : res.data.message
                })
            }else{
                dispatch({
                    type : TRX_FAILED_LOADED,
                    payload : res.data.dataFailed
                })
            }
        })
        .catch((err) => {
            dispatch({
                type : TRX_FAILED_ERROR,
                payload : err.message
            })
        })
    }
}

export const bookHotel = (id, data) => {
    return(dispatch) => {
        console.log(id)
        dispatch({
            type : BOOK_LOADING
        })

        Axios.post(apiURL2 + '/transaction?id=' + id, data)
        .then((res) => {
            console.log(res)
            if(res.data.error){
                dispatch({
                    type : BOOK_ERROR,
                    payload : res.data.message
                })
            }else{
                dispatch({
                    type : BOOK_LOADED,
                    payload : res.data.message
                })
            }
        })
        .catch((err) => {
            dispatch({
                type : BOOK_ERROR,
                payload : err.message
            })
        })
    }
}

export const onTransactionMessageDelete = () =>{
    return{
        type : BOOK_CLEAR
    }
}
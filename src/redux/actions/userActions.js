import Axios from 'axios'
import { apiURL, apiURL2 } from '../../constant/apiURL'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_END, AUTH_SUCCESS, CHANGE_EMAIL, CHANGE_PASSWORD, ERROR, ERROR_END, LOADING } from '../actionTypes';


export const onUserRegister = (email, password) => {
    return(dispatch) => {
        try {
            dispatch({
                type : LOADING
            })
            if(!email || !password) throw new Error('Email or Password not Complete')
            Axios.post(apiURL2 + '/auth/register', {email : email, password : password})
            .then((res) => {
                // console.log(res.data)
                if(res.data.error){
                    dispatch(
                        {
                            type : ERROR,
                            payload : res.data.message
                        }
                    )
                }else{
                    AsyncStorage.setItem('@token', res.data.token)
                    .then((respone) => {
                        dispatch(
                            {
                                type : AUTH_SUCCESS,
                                payload : res.data.token
                            }
                        )
                    })
                    .catch((err) => {
                        dispatch({
                            type : ERROR,
                            payload : err.message
                        })
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch(
                    {
                        type : ERROR,
                        payload : err.message
                    }
                )
            })
    
        } catch (error) {
            console.log(error)
            dispatch(
                {
                    type : ERROR,
                    payload : error.message
                }
            )
        }
        
    }
}

export const onSaveToken = (token) => {
    return{
        type : AUTH_SUCCESS,
        payload : token
    }
}

export const onRemoveToken = () => {
    return{
        type : AUTH_END
    }
}

export const onUserLogin = (email, password) => {
    return (dispatch) => {
        try {
            dispatch({
                type : LOADING
            })
            if(!email || !password) throw new Error('Email or Password not be null')
            Axios.post(apiURL2 + '/auth/login', {email : email, password : password})
            .then((res) => {
                if(res.data.error){
                    dispatch(
                        {
                            type : ERROR,
                            payload : res.data.message
                        }
                    )
                }else{
                    AsyncStorage.setItem('@token', res.data.token)
                    .then((respone) => {
                        dispatch({
                            type : AUTH_SUCCESS,
                            payload : res.data.token
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        dispatch({
                            type : ERROR,
                            payload : err.message
                        })
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type : ERROR,
                    payload : err.message
                })
            })
        } catch (error) {
            dispatch({
                type : ERROR,
                payload : error.message
            })
        }
    }
}

export const onErrorDelete = () =>{
    return{
        type : ERROR_END
    }
}

export const onEmailChange = (text) => {
    return{
        type : CHANGE_EMAIL,
        payload : text
    }
}

export const onPasswordChange = (text) => {
    return{
        type : CHANGE_PASSWORD,
        payload : text
    }
}
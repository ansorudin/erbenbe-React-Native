import { OPTION_FALSE, OPTION_TRUE } from "../actionTypes"

export const onTrue = () => {
    return{
        type : OPTION_TRUE
    }
}

export const onFalse = () => {
    return{
        type : OPTION_FALSE
    }
}
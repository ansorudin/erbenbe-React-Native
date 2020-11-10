const {OPTION_TRUE, OPTION_FALSE} = require("../actionTypes")

const data = {
    opt : true
}

const optionsTabbarReducer = (state=data, action) => {
    switch(action.type){
        case OPTION_TRUE :
            return {opt : true}
        case OPTION_FALSE :
            return {opt : false}
        default :
            return state
    }
}

export default optionsTabbarReducer
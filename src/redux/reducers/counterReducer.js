let data = {
    haha : 1
}

function counterReducer (state=data, action){
    if(action.type === 'TAMBAH'){
        return {haha : state.haha + 1}
    }else if(action.type === 'MINUS'){
        return {haha : state.haha - 1}
    }else{
        return state
    }
}

export default counterReducer
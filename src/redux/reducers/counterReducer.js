let data = {
    counter : 1
}

function counterReducer (state=data, action){
    if(action.type === 'TAMBAH'){
        return {counter : state.counter + 1}
    }else if(action.type === 'MINUS'){
        return {counter : state.counter - 1}
    }else{
        return state
    }
}

export default counterReducer
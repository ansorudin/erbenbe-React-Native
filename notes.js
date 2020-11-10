// redux term
    // store ==> tempat buat nyimpen reducers
    // reducer ==> global state, function return object
    // action ==> object, dikirim ke reducer buat ubah objectnya (gs)
    // action creator ==> function yang menghasilkan action (object)


// CRUD


var obj = {
    email : "fikri",
    password : "",
    token : "xxxxxxccccc"
}


obj = {...obj,token : "aaaabbbccc"}

console.log(obj)
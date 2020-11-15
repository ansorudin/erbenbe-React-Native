const { default: Axios } = require("axios")

export const getPredictionList = (search, key) =>{
    
    Axios.post(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&types=(cities)&language=pt_BR&key=${key}`)
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
}

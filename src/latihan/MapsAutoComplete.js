import Axios from 'axios'
import { Icon, Item } from 'native-base'
import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getPredictionList } from './LatihanFetchMaps'



const MapsAutoComplete = () => {

    const [data, setData] = useState(null)
    const [textData, setTextData] = useState('')

    const onChangeAddressBox = (text) => {
        console.warn(text)
        let key = 'AIzaSyCk3A066aj1OmIre0MGrtu0rlxVWYAqvgE'
        Axios.post(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=(cities)&language=ENG&key=${key}`)
        .then((res) => {
            setData(res.data.predictions)
        })
        .catch((err) => {
            console.log(err)
        })
    }

const onClickAddress = (place_id) => {
    let key = 'AIzaSyCk3A066aj1OmIre0MGrtu0rlxVWYAqvgE'
    Axios.post(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${key}`)
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
}

console.log(data)


    return (
        <SafeAreaView style={{alignItems : 'center'}}>
            <View style={{borderWidth : 0.5, width : 300, paddingVertical : 5, borderRadius : 5}}>
                <TextInput 
                placeholder='Input Addres' 
                onChangeText={text => onChangeAddressBox(text)}
                onSubmitEditing={()=> onClickAddress(data[0].place_id)}
                />
                
            </View>
            <View style={{width : 300, marginTop : 10}}>
                <FlatList 
                    data={data}
                    keyExtractor={item => item.place_id}
                    renderItem={({item, index}) => {
                        return(
                            <TouchableOpacity 
                            style={{justifyContent : 'flex-start' ,width : 300, paddingVertical : 20, flexDirection : 'row', alignItems : 'center', borderBottomWidth : 0.5}}
                            onPress={() => onClickAddress(item.place_id)}>
                                <Icon style={{marginLeft : -7, width : 40}} type='EvilIcons' name='location' />
                                <View style={{flex : 1}}>
                                    <Text >{item.description}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                
                />
            </View>
       </SafeAreaView>
    )
}

export default MapsAutoComplete

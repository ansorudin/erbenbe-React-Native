import { Container, Icon, Text, View } from 'native-base'
import React from 'react'
import { ImageBackground, Image, SafeAreaView,  TouchableOpacity } from 'react-native';
import {Dimensions} from 'react-native'
import {apiURL2 } from '../../constant/apiURL';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CardComponent = ({marginTop, name, lokasi, harga, image, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{width : windowWidth /1.15, marginBottom : 30, borderRadius : 10, marginTop : marginTop}}>
            <Image source={{uri : apiURL2 + '/public/hotel-images/' + image}} 
            style={{height : 230, width : '100%', borderRadius : 10}}>
            </Image>

            <Icon 
            type='MaterialIcons' 
            name='favorite' 
            style={{position : 'absolute', right : 5, top : 5, fontSize : 25, color : 'salmon'}}/>


            
            <View style={{marginTop : 10}}>
                <View style={{flexDirection : 'row', alignItems : 'flex-end'}}>
                    <Icon type='MaterialIcons' name='star' style={{fontSize: 16, color: 'salmon'}} />
                    <Text style={{fontSize : 12, marginHorizontal : 3}}>4.88</Text>
                    <Text style={{fontSize : 12}}>(49)</Text>
                </View>
                <Text style={{fontSize : 17, fontWeight : '300', marginTop : 10}}>{name}</Text>
                
            </View>
            <View style={{flexDirection : 'row', marginTop : 6, alignItems : 'center'}}>
                <Text style={{fontSize : 18, fontWeight : '500', marginRight : 5}}>
                    ${harga}
                </Text>
                <Text style={{fontSize : 14, fontWeight : '300'}}>
                    / night
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardComponent

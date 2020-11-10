import { Icon } from 'native-base'
import React from 'react'
import { Image, View, Dimensions, Text, TouchableOpacity  } from 'react-native'
import { apiURL2 } from '../../../constant/apiURL';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DetailRooms = ({image, nameRoom, price, onPress, roomLeft}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{flexDirection : 'row', marginTop : 30}}>
            <View style={{flex : 1}}>
                <Image source={{uri : apiURL2 + '/public/room-images/' + image}} style={{height : 100, width : 100, borderRadius : 10}} />
            </View>
            <View style={{flex : 2, justifyContent : 'space-between'}}>
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <View>
                        <Text style={{fontWeight : '600', fontSize : 16}}>{nameRoom}</Text>
                        <Text style={{color : 'gray', marginTop : 3}}>{roomLeft} Rooms Left</Text>
                    </View>
                    <View style={{flexDirection : 'row', justifyContent : 'center'}}>
                        <Text style={{fontWeight : '600', fontSize : 18, marginRight : 3}}>${price}</Text>
                        <Text style={{color : 'gray'}}>/Night</Text>
                    </View>
                </View>
                <View style={{flexDirection : 'row', flexWrap:'wrap' }}>
                    <View style={{marginRight : 10, flexDirection : 'row', marginTop : 5}}>
                        <Icon type='FontAwesome' name='bed' style={{fontSize : 20, color : 'gray'}}/>
                        <Text style={{marginLeft : 5,fontSize : 13, marginTop : 3, color : 'gray'}}>2 Bedroom</Text>
                    </View>
                    <View style={{marginRight : 10, flexDirection : 'row', marginTop : 5}} >
                        <Icon type='MaterialIcons' name='restaurant' style={{fontSize : 20, color : 'gray'}}/>
                        <Text style={{marginLeft : 5,fontSize : 13, marginTop : 3, color : 'gray'}}>Breakfast</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DetailRooms

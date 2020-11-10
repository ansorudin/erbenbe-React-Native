import { Icon } from 'native-base'
import React from 'react'
import { Image, Text, View, Dimensions } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { apiURL2 } from '../../constant/apiURL'
import DetailBooking from '../DetailBooking/DetailBooking'



const windowWidth = Dimensions.get('window').width
const CardBooking = ({paid,onPress, modalVisible, onPresHeader, hotelName, location, startDate, endDate, bulan, hotelImage}) => {
    return (
            <TouchableWithoutFeedback
            onPress={onPress}
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 0.3 }, shadowOpacity: 0.3, shadowRadius: 0.5 ,borderRadius : 10, marginVertical : 15, backgroundColor : 'white'}}>
                <Image 
                style={{width : windowWidth * 0.9, height : 200, borderTopRightRadius : 10, borderTopLeftRadius : 10}}
                source={{uri : apiURL2 + '/public/hotel-images/' + hotelImage}} 
                />
                <View style={{paddingHorizontal : 10, marginTop : 15}}>
                    <Text style={{fontSize : 18}}>{hotelName}</Text>
                    <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 5, marginLeft : -3}}>
                        <Icon type='EvilIcons' name='location' style={{fontSize : 18, fontWeight : '300'}} />
                        <Text style={{fontSize : 12, fontWeight : '300', marginLeft : 5}}>{location}</Text>
                    </View>
                </View>
                <View style={{paddingHorizontal : 10, marginTop : 10, flexDirection : 'row', alignItems : 'center', marginBottom : 15}}>
                    <View style={{flexDirection : 'row', alignItems : 'center', marginLeft : -3}}>
                        <Icon type='EvilIcons' name='calendar' style={{fontSize : 18, fontWeight : '300'}} />
                        <Text style={{fontSize : 12, fontWeight : '300', marginLeft : 5}}>{startDate} - {endDate} {bulan}</Text>
                    </View>
                    <Icon type='MaterialIcons' name='fiber-manual-record' style={{ color : 'gray',fontSize : 5, marginBottom : -3, marginHorizontal : 7}}/>
                    <Text style={{fontSize : 12, fontWeight : '300'}}>1 Room</Text>
                    <Icon type='MaterialIcons' name='fiber-manual-record' style={{ color : 'gray',fontSize : 5, marginBottom : -3, marginHorizontal : 7}}/>
                    <Text style={{fontSize : 12, fontWeight : '300'}}>2 guest</Text>
                </View>

                {
                    paid === 'succes' ? 
                    <View style={{paddingHorizontal : 10, marginBottom : 15}}>
                        <Text style={{fontSize : 12, color : 'green'}}>Purchased Succesful</Text>
                    </View>
                    :
                    <View style={{paddingHorizontal : 10, marginBottom : 15}}>
                        <Text style={{fontSize : 12, color : 'red'}}>Waiting Payment</Text>
                    </View>

                }
            </TouchableWithoutFeedback>
    )
}

export default CardBooking

import { Icon, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Image, Dimensions, ScrollView,StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import CarouselDetailRoom from './ComponentDetailRoom/CarouselDetailRoom';
import {getRoomsById} from './../../redux/actions/hotelsActions'
import detailHotel from '../../redux/reducers/detailHotel';
import roomDetailReducer from '../../redux/reducers/roomDetailReducer';
import HeaderRButton from '../../component/HeaderComponent/HeaderRButton';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const DetailHotelRoom = ({navigation, route, roomDetail, getRoomsById,}) => {

    const [backgroundHeader, setBackgroundHeader] = useState('transparent')

    useEffect(() => {
        getRoomsById(route.params.id_room)
    },[])
    //
    return (
        <View style={{flex : 1, backgroundColor : '#fff'}}>
        <ScrollView 
        style={{backgroundColor : '#fff'}}
        stickyHeaderIndices={[0]}
        onScroll={(event) => event.nativeEvent.contentOffset.y >= 55 ? setBackgroundHeader('white') : setBackgroundHeader('transparent') }
        scrollEventThrottle={16}
        >
            <HeaderRButton nameIcon='chevron-left' onPress={() => navigation.navigate('hoteldetail') } backgroundHeader={backgroundHeader} />

            <View style={{alignItems : 'center',flexDirection : 'row',marginTop : 30,marginBottom : 20,  paddingHorizontal : 20}}>
                <View>
                    <Text style={{fontSize : 20, fontWeight : '600'}}>Room Details</Text>
                </View>
            </View>
            <View style={{paddingLeft : 8}}>
                <CarouselDetailRoom images={roomDetail.data && roomDetail.data} />
                <ScrollView horizontal style={{marginTop : 2, marginLeft : 12}}>
                        <View style={{borderWidth : 1, borderRadius : 10, padding : 1, borderColor : 'rgba(41, 171, 135, 0.7)'}}>
                            <View
                            style={{
                                flexDirection : 'row', backgroundColor : 'rgba(41, 171, 135, 0.7)', paddingVertical : 5, paddingLeft : 10, paddingRight : 15,
                                borderRadius : 10, alignItems : 'center'
                            }}
                            >
                                <Icon type='MaterialIcons' name='wifi' style={{fontSize : 17, marginRight : 6,color : 'white', padding : 0}}/>
                                <Text style={{fontSize : 14, fontWeight : '300', color : 'white'}}>
                                    Free Wifi
                                </Text>
                            </View>
                        </View>
                        
                    </ScrollView>
            </View>
            <View style={{marginTop : 25, marginHorizontal : 20, flexDirection : 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={{fontSize : 18, fontWeight : '600'}}>{route.params && route.params.name}</Text>
                    <Text style={{fontWeight : '300', marginTop : 5}}>2nd Floor</Text>
                </View>
            </View>

            <View style={{marginTop : 25, marginHorizontal : 20}}>
                <View>
                    <Text style={{fontSize : 18, fontWeight : '600'}}>About this room</Text>
                    <Text style={{fontWeight : '300', marginTop : 15}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Frater et T. Haec mihi videtur delicatior, ut ita dicam, 
                    molliorque ratio, quam virtutis vis gravitasque postulat. 
                    An vero, inquit, quisquam potest probare, quod perceptfum,  
                    </Text>
                </View>
            </View>
            <View style={{marginTop : 25, marginHorizontal : 20}}>
                <View>
                    <Text style={{fontSize : 18, fontWeight : '600'}}>Cancelation policy</Text>
                    <Text style={{fontWeight : '300', marginTop : 10}}>
                    Free cancellation until 2.00 PM on Dec 4. After that, cancel before 2.00 PM on Dec 5 get 
                    full refund.
                    </Text>
                </View>
            </View>
        </ScrollView>

        <View style={{height :100, backgroundColor : '#fff', paddingHorizontal : 20, justifyContent : 'center'}}>
            <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                <View>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                        <Text style={{fontWeight : '600', fontSize : 20, marginRight : 3}}>${route.params&&route.params.price}</Text>
                        <Text style={{color : 'gray'}}>/Night</Text>
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'flex-end', marginTop : 3}}>
                        <Icon type='MaterialIcons' name='star' style={{fontSize: 14, color: 'salmon'}} />
                        <Text style={{fontSize : 11, marginHorizontal : 3}}>4.88</Text>
                        <Text style={{fontSize : 11}}>(49)</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('summarybook', {id_room : roomDetail.data.rooms_id, roomDetail : {name : route.params.name, price : route.params.price}})} 
                style={{paddingHorizontal : 40,paddingVertical : 10,borderRadius : 10, backgroundColor : 'salmon'}}>
                    <Text style={{fontSize : 16, fontWeight : '600', color : '#fff'}}>Reserve</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        roomDetail : state.roomDetail
    }
  }
  
  const mapDispatchToProps ={
    getRoomsById
  }

export default connect(mapStateToProps, mapDispatchToProps)(DetailHotelRoom)

import React, { useEffect, useState } from 'react'
import { View, Dimensions, Text } from 'react-native'
import { ScrollView, } from 'react-native-gesture-handler'
import { connect } from 'react-redux';
import CarouselHotelDetail from './HotelComponent/CarouselHotelDetail';
import HeaderRLButton from './../../component/HeaderComponent/HeaderRLButton'
import DetailItem from './HotelComponent/DetailItem';
import DetailRooms from './HotelComponent/DetailRooms';
import {getDataById} from '../../redux/actions/hotelsActions'
import {onFalse} from '../../redux/actions/optionsActions'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const HotelDetail = ({navigation, route, detailHotel, getDataById, onFalse}) => {
    const [backgroundHeader, setBackgroundHeader] = useState('transparent')
    
    useEffect(() => {
        let id = route.params.id
        let startDate = route.params.startDate
        let endDate = route.params.endDate
        getDataById(id, startDate, endDate)
        onFalse()
    }, [])
    
    // 
    return (
        <ScrollView
            stickyHeaderIndices={[0]}
            onScroll={(event) => event.nativeEvent.contentOffset.y >= 291 ? setBackgroundHeader('white') : setBackgroundHeader('transparent') }
            scrollEventThrottle={16}
            style={{backgroundColor : 'white'}}
        >
            <View>
                <HeaderRLButton onPress={() => {navigation.navigate('home'), onFalse()} } backgroundHeader={backgroundHeader} />
            </View>
            <View style={{marginTop : -100, zIndex : -1}}>
                <CarouselHotelDetail images={detailHotel.data && detailHotel.data.hotelImages} />
            </View>        
            <DetailItem 
            location={detailHotel.data && detailHotel.data.hotels.location} 
            name={detailHotel.data && detailHotel.data.hotels.name}
            address={detailHotel.data && detailHotel.data.hotels.address} />
            <View style={{paddingHorizontal : 30, marginTop : 20}}>
                <Text style={{fontSize : 18, fontWeight : '600'}}>
                    Select Room
                </Text>
                {
                    detailHotel.data && detailHotel.data.rooms.map((val, index) => {
                        return(
                            <DetailRooms 
                            onPress={() => {navigation.navigate('roomdetail', {id_room : val.id, name : val.name, price : val.price})}} 
                            image={val.room_image.split(',')[0]} nameRoom={val.name} price={val.price} key={index}
                            roomLeft={val.room_left}
                            />
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        detailHotel : state.detailHotel,
        option : state.option
    }
  }
  
  const mapDispatchToProps ={
    getDataById, onFalse
  }

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetail)

import { Icon } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import {StyleSheet ,Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { apiURL2 } from '../../constant/apiURL'
import HeaderRButton from '../../component/HeaderComponent/HeaderRButton'
import CheckinCheckoutComponent from './SummaryBookComponent/CheckinCheckoutComponent'
import DetailFeesAndTax from './SummaryBookComponent/DetailFeesAndTax'


const SummaryBook = ({navigation, detailHotel, roomDetail, route, hotels}) => {
    
    const totalDay = useRef((Number(hotels.filterEndDate.split('-').join('')) - Number(hotels.filterDate.split('-').join(''))))
    const [backgroundHeader, setBackgroundHeader] = useState('transparent')

    let data = {
        roomName : route.params.roomDetail.name,
        hotelName : detailHotel.data.hotels.name,
        price : route.params.roomDetail.price,
        image : roomDetail.data[0].url,
        startDate : hotels.filterDate,
        endDate : hotels.filterEndDate,
        id_room : route.params.id_room
    }


    return (
        <View style={styles.container}>
            <ScrollView
            style={{backgroundColor : '#fff'}}
            stickyHeaderIndices={[0]}
            onScroll={(event) => event.nativeEvent.contentOffset.y >= 55 ? setBackgroundHeader('white') : setBackgroundHeader('transparent') }
            scrollEventThrottle={16}
            >
                <HeaderRButton nameIcon='chevron-left' onPress={() => navigation.navigate('roomdetail')} backgroundHeader={backgroundHeader} />
                <View>
                    <View>
                        <View style={styles.containerTextHeader}>
                            <Text style={styles.textHeader}>Detail Booking</Text>
                        </View>
                    </View>


                    <View style={styles.containerBody}>
                        <View style={styles.containerBodyDetailHotel}>
                            <View style={{flex : 2}}>
                                <Text style={{fontWeight : '300', letterSpacing : 0.3, fontSize : 16}}>
                                    {data.hotelName}
                                </Text>
                                <Text style={{fontWeight : '600', letterSpacing : 0.3, marginVertical : 7, fontSize : 12}}>
                                    {data.roomName}
                                </Text>
                                <Text style={{fontSize : 17, fontWeight : '300', }}>
                                    ${data.price} / night
                                </Text>
                                
                            </View>
                            <View style={{flex : 1}}>
                                <Image source={{uri : apiURL2 + '/public/room-images/' + roomDetail.data[0].url}} 
                                style={{height : 100, width : 130, borderRadius : 5 }} />
                            </View>
                        </View>

                        <View style={{ paddingVertical : 30, borderBottomWidth : 0.5}}>
                            <CheckinCheckoutComponent date={data.startDate} />
                            <CheckinCheckoutComponent date={data.endDate} marginTop={15} />
                        </View> 

                        <View style={{paddingVertical : 30, borderBottomWidth : 0.5}}>
                            <DetailFeesAndTax price={data.price} totalDay={totalDay.current} />
                        </View>

                        <View style={{paddingVertical : 30, flexDirection : 'row', justifyContent : 'space-between'}}>
                            <Text style={{fontSize : 18, fontWeight : '300'}}>Total</Text>
                            <Text style={{fontSize : 18, fontWeight : '600'}}>${(data.price * totalDay.current) + 10 + 15}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{height :100, backgroundColor : '#fff', paddingHorizontal : 20, justifyContent : 'center', marginBottom : 20}}>
                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                    <View>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <Text style={{fontWeight : '600', fontSize : 18, marginRight : 7}}>${(data.price * totalDay.current) + 10 + 15}</Text>
                            <Text style={{color : 'gray', fontSize : 18, fontWeight : '300'}}>for {totalDay.current} nights</Text>
                        </View>
                        <Text style={{marginTop : 5, textDecorationLine : 'underline', fontWeight : '500'}}>
                            See Details
                        </Text>
                    </View>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('pay-and-confirm', {price : data.price, hotel_room : data.roomName, id_room : data.id_room})}
                    style={{paddingHorizontal : 40,paddingVertical : 10,borderRadius : 10, backgroundColor : 'salmon'}}>
                        <Text style={{fontSize : 16, fontWeight : '600', color : '#fff'}}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white', 
        flex : 1
    },
    containerTextHeader : {
        paddingHorizontal : 20, 
        flexDirection : 'row', 
        alignItems : 'center',
        marginTop : 30
    },
    textHeader : {
        fontWeight : '300', 
        fontSize : 20
    },
    containerBody : {
        paddingHorizontal : 20
    },
    containerBodyDetailHotel : {
        flexDirection : 'row', 
        justifyContent : 'space-between', 
        borderBottomWidth : 0.5, 
        paddingVertical : 30, 
        alignItems : 'center'
    }

})

const mapStateToProps = (state) => {
    return {
        detailHotel : state.detailHotel,
        roomDetail : state.roomDetail,
        hotels : state.hotels
    }
}
  


export default connect(mapStateToProps)(SummaryBook)

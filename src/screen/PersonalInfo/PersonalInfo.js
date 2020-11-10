import { Icon } from 'native-base'
import React, { useRef, useState } from 'react'
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { apiURL2 } from '../../constant/apiURL'
import moment from 'moment'
import HeaderRButton from '../../component/HeaderComponent/HeaderRButton'
import DetailFeesAndTax from '../SummaryBook/SummaryBookComponent/DetailFeesAndTax'
import {bookHotel} from './../../redux/actions/transactionActions'

const PersonalInfo = ({detailHotel, hotels,navigation, route, bookHotel, user, roomDetail}) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const totalDay = useRef((Number(hotels.filterEndDate.split('-').join('')) - Number(hotels.filterDate.split('-').join(''))))

    let data ={
        hotelName : detailHotel.data.hotels.name,
        location : detailHotel.data.hotels.location,
        startDate : hotels.filterDate,
        endDate : hotels.filterEndDate,
        images : detailHotel.data.hotelImages[0].url,
        price : route.params.price
    }

    const onRequestBookBtn = () => {
        let id = user.token
        let data = {
            begin_book_date : hotels.filterDate,
            end_book_date : hotels.filterEndDate,
            rooms_id : roomDetail.data[0].rooms_id,
            hotel_name : detailHotel.data.hotels.name,
            price : route.params.price,
            hotel_room : route.params.hotel_room,
            hotels_id : detailHotel.data.hotels.id

        }

        bookHotel(id, data)
    }

    return (
        <View style={{backgroundColor : 'white', flex : 1}}>
            
            <ScrollView>
                <View>
                    <View>
                        <HeaderRButton onPress={() => navigation.navigate('summarybook')} />
                        <View style={{paddingHorizontal : 20, flexDirection : 'row', alignItems : 'center'}}>
                            
                            <Text style={{fontWeight : '300', fontSize : 20}}>Confirm and pay</Text>
                        </View>
                    </View>


                    <View style={{paddingHorizontal : 20}}>
                        <View style={{alignItems : 'center',flexDirection : 'row', justifyContent : 'space-between', borderBottomWidth : 0.5, paddingVertical : 30}}>
                            <View style={{flex :2}}>
                                <Text style={{fontWeight : '300', letterSpacing : 0.3, fontSize : 16}}>
                                    {data.hotelName} 
                                </Text>
                                <Text style={{fontWeight : '300', letterSpacing : 0.3, marginVertical : 7, fontSize : 16}}>
                                    <Text style={{fontWeight : '600'}}>in </Text>{data.location}
                                </Text>
                                <Text style={{fontSize : 14, fontWeight : '300', }}>
                                    {moment(data.startDate).format('DD')} - {moment(data.endDate).format('DD MMM')}, 2 guest
                                </Text>
                                
                            </View>
                            <View style={{flex : 1}} >
                                <Image source={{uri : apiURL2 + '/public/hotel-images/' + data.images}} style={{height : 100, width : 130, borderRadius : 5 }} />
                            </View>
                        </View>

                        <View style={{justifyContent: 'space-between', paddingVertical : 30, borderBottomWidth : 0.5, flexDirection : 'row', alignItems : 'center'}}>
                            <View style={{flexDirection : 'row'}}>
                                <Image 
                                style={{height : 25, width : 50}}
                                source={require('./../../../asset/mastercard.png')} 
                                />
                                <Text style={{fontWeight : '300', fontSize : 18, marginLeft : 15}}>5243-2560-XXXX-XXXX</Text>
                            </View>

                            <Icon onPress={() => navigation.navigate('select-pay')} type='EvilIcons' name='chevron-right' />
                        </View> 

                        <View style={{paddingVertical : 30, borderBottomWidth : 0.5, display : isEnabled ? 'flex' : 'none'}}>
                            <DetailFeesAndTax price={data.price} totalDay={totalDay.current} />
                        </View>

                        <View style={{borderBottomWidth : 0.5, paddingVertical : 30, flexDirection : 'row', justifyContent : 'space-between'}}>
                            <View>
                                <Text style={{fontSize : 18, fontWeight : '300'}}>Total (USD)</Text>
                                {
                                    isEnabled ?
                                    <Text onPress={toggleSwitch} style={{fontSize : 12, fontWeight : '300', marginTop : 6, color : 'green'}}>Hide details</Text>
                                    :
                                    <Text onPress={toggleSwitch} style={{fontSize : 12, fontWeight : '300', marginTop : 6, color : 'green'}}>Price details</Text>

                                }
                            </View>
                            <Text style={{fontSize : 18, fontWeight : '600'}}>$413</Text>
                        </View>

                        <View style={{borderBottomWidth : 0.5, paddingVertical : 30,}}>
                            <Text style={{fontSize : 18, fontWeight : '300'}}>
                                Cancellation policy
                            </Text>
                            <Text style={{marginTop : 20, fontWeight : '300', fontSize : 12}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qui non
                                moveatur et offensione turpitudinis et comprobatione honestatis? Erg
                                o adhuc, quantum equidem intellego, causa non videtur fuisse mutandi 
                                nominis. Plane idem, inquit, et maxima quidem, qua fieri nulla maior potest. 
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{height :100, backgroundColor : '#fff', paddingHorizontal : 20, justifyContent : 'center', marginBottom : 20}}>
                <View >
                    <TouchableOpacity onPress={onRequestBookBtn} style={{justifyContent : 'center',flexDirection : 'row',alignItems : 'center',paddingHorizontal : 40,paddingVertical : 10,borderRadius : 10, backgroundColor : 'salmon'}}>
                        <Icon type='EvilIcons' name='lock' style={{color : '#fff'}} />
                        <Text style={{fontSize : 13, fontWeight : '600', color : '#fff'}}>Request to book - $413</Text>
                    </TouchableOpacity>
                </View>
            </View>           
            
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        detailHotel : state.detailHotel,
        hotels : state.hotels,
        book : state.bookTrx,
        user : state.user,
        roomDetail : state.roomDetail
    }
  }
const mapDispatchToProps = {
    bookHotel
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)

import { Icon } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, Modal, ScrollView, Text, View, TouchableWithoutFeedback, FlatList  } from 'react-native'
import { connect } from 'react-redux'

import HeaderRButton from '../../component/HeaderComponent/HeaderRButton'
import CarouselHotelDetail from '../HotelDetail/HotelComponent/CarouselHotelDetail'
import CheckinCheckoutComponent from '../SummaryBook/SummaryBookComponent/CheckinCheckoutComponent'
import {getDataTransactionsById} from './../../redux/actions/transactionActions'
import { apiURL2 } from '../../constant/apiURL'

const windowWidth = Dimensions.get('window').width
const {width} = Dimensions.get('window')
const height = width * 0.9 // 60%
const DetailBooking = ({navigation, onPress, route, trxById, getDataTransactionsById}) => {

    useEffect(() => {
        let id = route.params.id
        
        getDataTransactionsById(id)
    }, [])



    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <Modal 
        animationType="slide"
        transparent={true}
        visible={true}
        
      >
        <View style={{flex : 1, backgroundColor : '#fff'}}>
            <ScrollView>
                <HeaderRButton onPress={() => navigation.goBack(null)} />
                <View style={{paddingHorizontal : 20, marginBottom : 100}}>
                    
                    <ScrollView
                        horizontal
                        style={{width : windowWidth * 0.9, height, borderRadius : 10}}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        >
                        {
                            trxById.data &&
                            trxById.data.hotel_images.map((image, index) => (
                                <Image 
                                key={index}
                                source={{uri : apiURL2 + '/public/hotel-images/' + image}}
                                style={{width : windowWidth * 0.9, height, resizeMode : 'cover', borderRadius : 10}}
                                />
                            ))
                        }
                    </ScrollView>


                    <Text style={{fontSize : 18, fontWeight : '300', marginTop : 15}}>{trxById.data && trxById.data.hotel_name}</Text>
                    <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 8, marginLeft : -3}}>
                        <Icon type='EvilIcons' name='location' style={{fontSize : 18, fontWeight : '300'}} />
                        <Text style={{fontSize : 12, fontWeight : '300', marginLeft : 5}}>{trxById.data && trxById.data.location}</Text>
                    </View>

                    <View style={{borderBottomWidth : 0.5, paddingVertical : 30}}>
                        <CheckinCheckoutComponent 
                        text='Check-in' 
                        
                        />
                        <CheckinCheckoutComponent 
                        text='Check-out' marginTop={15} 
                        
                        />
                    </View>
                    <View style={{borderBottomWidth : 0.5, paddingVertical : 30}}>
                        <Text style={{fontWeight : '600'}}>Confirmation Code</Text>
                        <Text style={{fontWeight : '300', marginTop : 10}}>HMJUNHMH</Text>
                    </View>
                    <View style={{borderBottomWidth : 0.5, paddingVertical : 30}}>
                        <Text style={{fontWeight : '600'}}>Payment Info</Text>
                        <Text style={{fontWeight : '300', marginTop : 10}}>Total Cost</Text>
                        <View style={{flexDirection : 'row', marginTop : 10, alignItems :'center'}}>
                            <Text style={{fontWeight : '300'}}>IDR {trxById.data && trxById.data.price}</Text>
                            {
                                route.params.status !== 'succes' ?
                                <Text onPress={() => {navigation.navigate('homerouter', { screen: 'pay-now' })}} style={{textDecorationLine : 'underline', marginLeft : 10, color : 'red'}}>pay now</Text>
                                :
                                <Text style={{textDecorationLine : 'underline', marginLeft : 10}}>get receipt</Text>
                            }
                        </View>
                    </View>
                    <View style={{paddingVertical : 30}}>
                        <Text style={{fontWeight : '600'}}>Address</Text>
                        <Text style={{fontWeight : '300', marginTop : 10}}>
                            {trxById.data && trxById.data.address}
                        </Text>
                        <View style={{marginTop : 15, alignItems : 'center'}}>
                            <Text style={{fontWeight : '300', alignSelf : 'flex-start',}}>Getting there :</Text>
                            <Image 
                            style={{width : windowWidth * 0.85, height : 200, marginTop : 20, borderRadius : 5}}
                            source={require('./../../../asset/maps.png')} 
                            />
                        </View>
                    </View>
                    
                    
                </View>
            </ScrollView>
        </View>
        </Modal>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = (state) => {
    return{
        trxById : state.trxById
    }
}
const mapDispatchToProps = {
    getDataTransactionsById
}

export default connect(mapStateToProps, mapDispatchToProps) (DetailBooking)

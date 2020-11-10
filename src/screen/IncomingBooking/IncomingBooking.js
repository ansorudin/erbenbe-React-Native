import React, { useEffect, useState } from 'react'
import { View } from 'react-native-animatable'
import { connect } from 'react-redux'
import CardBooking from '../CardBooking/CardBooking'
import DetailBooking from '../DetailBooking/DetailBooking'
import {getDataTransactions} from './../../redux/actions/transactionActions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
import { ScrollView } from 'react-native'


const IncomingBooking = ({navigation, transaction, getDataTransactions, user}) => {


    useEffect(() => {
        let id = user.token
        getDataTransactions(id)
    }, [])

    
    return (
        <View style={{backgroundColor : '#fff', marginBottom : 100, flex : 1}}>
            <ScrollView>
                {
                transaction.data && transaction.data.map((val, index) => {
                    return(
                        <CardBooking key={index}  
                        hotelName={val.hotel_name}
                        startDate={moment(val.begin_book_date).format('DD')}
                        endDate={moment(val.end_book_date).format('DD')}
                        bulan={moment(val.end_book_date).format('MMM')}
                        location={val.address}
                        hotelImage={val.hotel_images.split(',')[0]}
                        onPress={() => navigation.navigate('detail-booking', {id : val.id})}
                        paid={val.status}
                        />
                    )
                })
                }
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state) => {
    return{
        transaction : state.transaction,
        user : state.user
    }
}
const mapDispatchToProps = {
    getDataTransactions
}



export default connect(mapStateToProps, mapDispatchToProps) (IncomingBooking)

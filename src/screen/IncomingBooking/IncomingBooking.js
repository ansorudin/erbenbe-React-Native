import React, { useEffect, useState } from 'react'
import { View } from 'react-native-animatable'
import { connect } from 'react-redux'
import CardBooking from '../CardBooking/CardBooking'
import {getDataTransactions} from './../../redux/actions/transactionActions'
import moment from 'moment'
import { ScrollView } from 'react-native'
import DetailBooking from '../DetailBooking/DetailBooking'


const IncomingBooking = ({navigation, transaction, getDataTransactions, user, book}) => {


    useEffect(() => {
        let id = user.token
        getDataTransactions(id)
    }, [book.message])

    
    return (
        <View style={{backgroundColor : '#fff', marginBottom : 100, flex : 1}}>
            <ScrollView
            contentContainerStyle={{paddingBottom : 120}}
            showsVerticalScrollIndicator={false}
            
            >
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
                        onPress={() => navigation.navigate('detail-booking', {id : val.id, status : val.status, onModal : true})}
                        paid={val.status}
                        onPresToPay={() => {navigation.navigate('homerouter', { screen: 'pay-now' })}}
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
        user : state.user,
        book : state.bookTrx
    }
}
const mapDispatchToProps = {
    getDataTransactions
}



export default connect(mapStateToProps, mapDispatchToProps) (IncomingBooking)

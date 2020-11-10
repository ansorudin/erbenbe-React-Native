
import React, { useEffect } from 'react'
import { Image, ScrollView, Text } from 'react-native'
import { View } from 'react-native-animatable'
import { connect } from 'react-redux'
import {getDataFailed} from './../../redux/actions/transactionActions'
import moment from 'moment'
import { apiURL2 } from '../../constant/apiURL'

const CanceledBooking = ({users, getDataFailed, failed}) => {

    useEffect(() => {
        let id = users.token
        getDataFailed(id)

    },[])

    
    
    return (
        <ScrollView>

            {
                failed.data && failed.data.map((val, index) => {
                    return(
                        <View key={index} style={{paddingVertical : 30, borderBottomWidth : 0.5, flexDirection : 'row', alignItems : 'center'}}>
                            <Image 
                            style={{height : 60, width : 60, borderRadius : 5}}
                            source={{uri : apiURL2 + '/public/hotel-images/' + val.url}} 
                            />
                            <View style={{marginLeft : 20}}>
                                <Text style={{fontWeight : '300'}}>{val.hotel_name} Bandung, West Java Indonesia</Text>
                                <Text style={{marginTop : 3, fontSize : 12, fontWeight : '300'}}>{moment(val.begin_book_date).format('DD')} - {moment(val.end_book_date).format('DD MMM')}</Text>
                                <Text style={{marginTop : 3, fontSize : 12, color : 'red'}}>Booking Failed</Text>
                            </View>
                        </View>
                    )
                })
            }
            
            
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return{
        users : state.user,
        failed : state.trxFailed
    }
}

const mapDispatchToProps = {
    getDataFailed
}

export default connect(mapStateToProps, mapDispatchToProps) (CanceledBooking)

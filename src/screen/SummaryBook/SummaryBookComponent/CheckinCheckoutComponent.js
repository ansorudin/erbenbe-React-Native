import React from 'react'
import { Text, View } from 'react-native'
import moment from 'moment'

const CheckinCheckoutComponent = ({date, marginTop, text}) => {
    return(
        <View style={{flexDirection : 'row', alignItems : 'center', marginTop : marginTop}} >
            <View style={{backgroundColor : '#F0F0F0', width : 70, height : 70, alignItems : 'center', justifyContent : 'center'}}>
                <Text style={{fontSize : 10, fontWeight : '600', marginBottom : 3}}>
                    {moment(date).format('MMM')} 
                </Text>
                <Text style={{fontSize : 12, fontWeight : '600' }}>
                    {moment(date).format('DD')}
                </Text>
            </View>
            <View style={{marginLeft : 20}}>
                <Text style={{fontWeight : '300', fontSize : 13}}>{moment(date).format('dddd')} {text}</Text>
                <Text style={{fontSize : 16, fontWeight : '300', marginTop : 5}}>After 2.00 PM</Text>
            </View>
        </View>
    )
}

export default CheckinCheckoutComponent

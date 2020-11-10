import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import IncomingBooking from '../screen/IncomingBooking/IncomingBooking'
import DetailBooking from '../screen/DetailBooking/DetailBooking'


const Stack = createStackNavigator()
const TransactionRouter = () => {

    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='upcoming-list' component={IncomingBooking} />
            <Stack.Screen name='detail-booking' component={DetailBooking} />

        </Stack.Navigator>
    )
}


export default TransactionRouter
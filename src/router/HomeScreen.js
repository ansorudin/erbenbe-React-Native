import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import HotelDetail from '../screen/HotelDetail/HotelDetail'
import DetailHotelRoom from '../screen/DetailRoom/DetailHotelRoom'
import Home from '../screen/Home/Home'
import HotelList from '../screen/HotelList/HotelList'
import DatePicker from '../screen/DatePicker/DatePicker'
import SummaryBook from '../screen/SummaryBook/SummaryBook'
import PersonalInfo from '../screen/PersonalInfo/PersonalInfo'
import SelectPayment from '../screen/PersonalInfo/PaymentComponent/SelectPayment'


const Stack = createStackNavigator()
const HomeRouter = () => {

    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen 
            name='home' 
            component={Home}
            />
            <Stack.Screen name='hotellist' component={HotelList} />
            <Stack.Screen name='datepicker' component={DatePicker} />
            <Stack.Screen name='hoteldetail' component={HotelDetail} />
            <Stack.Screen name='roomdetail' component={DetailHotelRoom} />
            <Stack.Screen name='summarybook' component={SummaryBook} />
            <Stack.Screen name='pay-and-confirm' component={PersonalInfo} />
            <Stack.Screen name='select-pay' component={SelectPayment} />

        </Stack.Navigator>
    )
}

export default HomeRouter


import React, { useEffect } from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import HotelDetail from '../screen/HotelDetail/HotelDetail'
import DetailHotelRoom from '../screen/DetailRoom/DetailHotelRoom'
import Home from '../screen/Home/Home'
import HotelList from '../screen/HotelList/HotelList'
import DatePicker from '../screen/DatePicker/DatePicker'
import SummaryBook from '../screen/SummaryBook/SummaryBook'
import PersonalInfo from '../screen/PersonalInfo/PersonalInfo'
import SelectPayment from '../screen/PersonalInfo/PaymentComponent/SelectPayment'
import { connect } from 'react-redux'
import {onTrue, onFalse} from './../redux/actions/optionsActions'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import PayNow from '../screen/PersonalInfo/PaymentComponent/PayNow'


const Stack = createStackNavigator()
const HomeRouter = ({navigation, route, opt}) => {

    useEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);

        switch (routeName) {
            case 'home':
                return navigation.setOptions({tabBarVisible : true});
            case 'datepicker':
                return navigation.setOptions({tabBarVisible : false});
            case 'hotellist':
                return navigation.setOptions({tabBarVisible : opt.opt});
            case 'hoteldetail':
                return navigation.setOptions({tabBarVisible : false});
            case 'roomdetail':
                return navigation.setOptions({tabBarVisible : false});
            case 'summarybook':
                return navigation.setOptions({tabBarVisible : false});
            case 'pay-and-confirm':
                return navigation.setOptions({tabBarVisible : false});
            case 'select-pay':
                return navigation.setOptions({tabBarVisible : false});
            case 'pay-now':
                return navigation.setOptions({tabBarVisible : false});
        }

    })
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen 
            name='home' 
            component={Home}
            />
            <Stack.Screen name='datepicker' component={DatePicker} />
            <Stack.Screen name='hotellist' component={HotelList} />
            <Stack.Screen name='hoteldetail' component={HotelDetail} />
            <Stack.Screen name='roomdetail' component={DetailHotelRoom} />
            <Stack.Screen name='summarybook' component={SummaryBook} />
            <Stack.Screen name='pay-and-confirm' component={PersonalInfo} />
            <Stack.Screen name='select-pay' component={SelectPayment} />
            <Stack.Screen name='pay-now' component={PayNow} />

        </Stack.Navigator>
    )
}

const mapStateToProps = (state) => {
    return{
        opt : state.option
    }
}

const mapDispatchToProps = {
    onTrue, onFalse
}

export default connect(mapStateToProps, mapDispatchToProps) (HomeRouter)


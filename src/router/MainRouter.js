import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../screen/Home/Home'
import Saved from '../screen/Saved/Saved'
import MyBooking from '../screen/MyBooking/MyBooking'
import MyInbox from '../screen/MyInbox/MyInbox'
import MyAccount from '../screen/MyAccount/MyAccount'


const Tab = createBottomTabNavigator()
const MainRouter = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='home' component={Home} />
            <Tab.Screen name='saved' component={Saved} />
            <Tab.Screen name='mybooking' component={MyBooking} />
            <Tab.Screen name='myinbox' component={MyInbox} />
            <Tab.Screen name='myaccount' component={MyAccount} />
        </Tab.Navigator>
    )
}

export default MainRouter

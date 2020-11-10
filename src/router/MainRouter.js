import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Saved from '../screen/Saved/Saved'
import MyBooking from '../screen/MyBooking/MyBooking'
import MyInbox from '../screen/MyInbox/MyInbox'
import MyAccount from '../screen/MyAccount/MyAccount'
import { Icon } from 'native-base'
import HomeRouter from './HomeScreen'
import { connect } from 'react-redux'


const Tab = createBottomTabNavigator()
const MainRouter = ({option}) => {
    
    return (
        <Tab.Navigator 
        screenOptions={{
            tabBarVisible : option.opt
        }}
        tabBarOptions={{
            activeTintColor: '#e91e63',
            
          }}>
            <Tab.Screen 
            name='homerouter' 
            
            component={HomeRouter} 
            options={{
                tabBarLabel : 'Home',
                tabBarIcon : ({color, size}) => (
                    <Icon type='EvilIcons' name='search' />
                )
            }}/>
            <Tab.Screen 
            name='saved' 
            component={Saved} 
            options={{
                tabBarLabel : 'Saved',
                tabBarIcon : ({color, size}) => (
                    <Icon type='EvilIcons' name='heart' />
                )
            }}
            />
            <Tab.Screen 
            name='mybooking' 
            component={MyBooking} 
            options={{
                tabBarLabel : 'My Booking',
                tabBarIcon : ({color, size}) => (
                    <Icon type='EvilIcons' name='archive' />
                )
            }}/>
            <Tab.Screen 
            name='myinbox' 
            component={MyInbox} 
            options={{
                tabBarLabel : 'Message',
                tabBarIcon : ({color, size}) => (
                    <Icon type='EvilIcons' name='comment' />
                )
            }}/>
            <Tab.Screen 
            name='myaccount' 
            component={MyAccount} 
            options={{
                tabBarLabel : 'Account',
                tabBarIcon : ({color, size}) => (
                    <Icon type='EvilIcons' name='user' />
                )
            }}/>
        </Tab.Navigator>
    )
}

const mapStateToProps = (state) => {
    return {
        option : state.option
    }
  }
  

export default connect(mapStateToProps)(MainRouter)

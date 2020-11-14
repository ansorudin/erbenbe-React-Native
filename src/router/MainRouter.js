import React, { useEffect } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Saved from '../screen/Saved/Saved'
import MyBooking from '../screen/MyBooking/MyBooking'
import MyInbox from '../screen/MyInbox/MyInbox'
import MyAccount from '../screen/MyAccount/MyAccount'
import { Icon } from 'native-base'
import HomeRouter from './HomeScreen'
import { connect } from 'react-redux'
import OneSignal from 'react-native-onesignal';


const Tab = createBottomTabNavigator()
const MainRouter = ({option, user}) => {

    useEffect(() => {
        console.log(user.token)
        OneSignal.setLogLevel(6, 0);
    
        // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
        OneSignal.init("5440b917-b5c5-4f43-81a9-63693ce6fa96", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
        OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    
        // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
        // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
    
        OneSignal.addEventListener('received', onReceived);
        OneSignal.addEventListener('opened', onOpened);
        OneSignal.addEventListener('ids', onIds);
        OneSignal.setExternalUserId(user.token, (results) => {
            // The results will contain push and email success statuses
            console.log('Results of setting external user id');
            console.log(results);
            
            // Push can be expected in almost every situation with a success status, but
            // as a pre-caution its good to verify it exists
            if (results.push && results.push.success) {
                console.log('Results of setting external user id push status:');
                console.log(results.push.success);
            }
            
            // Verify the email is set or check that the results have an email success status
            if (results.email && results.email.success) {
                console.log('Results of setting external user id email status:');
                console.log(results.email.success);
            }
        })
    
        return () => {
          OneSignal.removeEventListener('received', onReceived);
          OneSignal.removeEventListener('opened', onOpened);
          OneSignal.removeEventListener('ids', onIds);
        }
      },[])
      
      const onReceived = (notification) => {
        console.log("Notification received: ", notification);
      }
    
      const onOpened = (openResult) => {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
      }
    
      const onIds = (device) => {
        console.log('Device info: ', device);
      }
    
    return (
        <Tab.Navigator 
        screenOptions={{
            tabBarVisible : true
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
        option : state.option,
        user : state.user
    }
  }
  

export default connect(mapStateToProps)(MainRouter)

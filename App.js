import { Container } from 'native-base'
import React, { useEffect, useState } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import AuthRouter from './src/router/AuthRouter'
import MainRouter from './src/router/MainRouter'
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onSaveToken } from './src/redux/actions/userActions'
import SpalshScreen from './src/screen/SpalshScreen/SpalshScreen'
import OneSignal from 'react-native-onesignal';


const App = ({user, onSaveToken}) => {
  const [isStorageChecked, setIsStorageChecked] = useState(false)

  useEffect(() => {
      const getStorageData = () => {
        AsyncStorage.getItem('@token')
        .then((data) => {
          if(data){
            onSaveToken(data)
          }
          setIsStorageChecked(true)
        })
        .catch((err) => {
          console.log(err)
          setIsStorageChecked(true)
        })
      }
      getStorageData()

  }, [])

  useEffect(() => {
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init("5440b917-b5c5-4f43-81a9-63693ce6fa96", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    }
  })
  
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

  


  if(isStorageChecked === false){
    return(
      <SpalshScreen />
    )
  }
  return (
      <NavigationContainer >
        <Container>
          {
            user.token !== '' ? 
            <MainRouter />
            :
            <AuthRouter />
          }
          
          
        </Container>
      </NavigationContainer>
  )
}

const mapDispatchToProps = {
  onSaveToken
}


const mapStateToProps = (state) => {
  return{
    user : state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

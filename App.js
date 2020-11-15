import { Container } from 'native-base'
import React, { useEffect, useState } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import AuthRouter from './src/router/AuthRouter'
import MainRouter from './src/router/MainRouter'
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onSaveToken } from './src/redux/actions/userActions'
import SpalshScreen from './src/screen/SpalshScreen/SpalshScreen'
import PayNow from './src/screen/PersonalInfo/PaymentComponent/PayNow'
import LatihanMaps from './src/latihan/LatihanMaps'
import MapsAutoComplete from './src/latihan/MapsAutoComplete'


const App = ({user, onSaveToken}) => {
  const [isStorageChecked, setIsStorageChecked] = useState(false)

  useEffect(() => {
      const getStorageData = () => {
        AsyncStorage.getItem('@token')
        .then((data) => {
          if(data){
            onSaveToken(data)
            console.log(data)
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

  

  const linkingOption = {
    prefixes : ['https://bubuyuq.com', 'bubuyuq://'],
    config : {
      screens : {
        homerouter : {
          path : 'homeRouter',
          screens : {
            home : 'home',
            datepicker : {
              path : 'datepicker/:location',
              params : {
                location : null
              }
            },
            hotellist : {
              path : 'hotellist/:location',
              params : {
                location : 'Bandung'
              }
            }
          }
        },
        saved : 'saved',
        mybooking : 'mybooking',
        myinbox : 'myinbox',
        myaccount : 'myaccount'
      }
    }
  }
  
  if(isStorageChecked === false){
    return(
      <SpalshScreen />
    )
  }
  return (
      <NavigationContainer linking={linkingOption} >
        <Container>
          {
            user.token !== '' ? 
            <MainRouter />
            :
            <AuthRouter />
          }
          {/* <MapsAutoComplete /> */}
          {/* <LatihanMaps /> */}
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

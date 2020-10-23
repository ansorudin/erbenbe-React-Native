import { Container } from 'native-base'
import React, { useState } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import AuthRouter from './src/router/AuthRouter'
import MainRouter from './src/router/MainRouter'
import {connect} from 'react-redux'


const App = ({user}) => {
  return (
      <NavigationContainer >
        <Container>
          {
            user === null ? 
            <AuthRouter />
            :
            <MainRouter />
          }
        </Container>
      </NavigationContainer>
  )
}

const mapStateToProps = (state) => {
  return{
    user : state.user
  }
}

export default connect(mapStateToProps)(App);

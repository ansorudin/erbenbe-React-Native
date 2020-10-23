import { Container } from 'native-base'
import React, { useState } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import AuthRouter from './src/router/AuthRouter'
import MainRouter from './src/router/MainRouter'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import counterReducer from './src/redux/reducers/counterReducer'

const store = createStore(counterReducer)


const App = () => {
  const [user, setUser] = useState(null)
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App

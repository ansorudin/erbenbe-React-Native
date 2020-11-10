import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Register from '../screen/Register/Register'
import Login from '../screen/Login/Login'
import GetStarted from '../screen/GetStarted/GetStarted'


const Stack = createStackNavigator()
const AuthRouter = () => {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name="getstarted" component={GetStarted} />
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='register' component={Register} />
        </Stack.Navigator>
    )
}

export default AuthRouter

/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './src/redux/reducers';


const store = createStore(rootReducer)

const Index = () => {
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Index);

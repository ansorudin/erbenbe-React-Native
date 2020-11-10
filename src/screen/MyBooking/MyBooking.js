import { Container, Content, Text } from 'native-base'
import React from 'react'
import { View, Dimensions } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IncomingBooking from '../IncomingBooking/IncomingBooking';
import PastBooking from '../PastBooking/PastBooking';
import CanceledBooking from '../CanceledBooking/CanceledBooking';
import TransactionRouter from '../../router/TransactionRouter';

const windowHeight = Dimensions.get('window').height

const Tab = createMaterialTopTabNavigator();
const MyBooking = () => {
    return (
        <Container >
                <View style={{paddingHorizontal : 20, marginTop : 100, backgroundColor : '#fff'}}>
                    <Text style={{fontSize : 20, fontWeight : '300', marginBottom : 20}}>
                        My Booking
                    </Text>

                    <View style={{height : windowHeight, flexWrap : 'nowrap', backgroundColor : '#fff'}}>
                        <Tab.Navigator

                            sceneContainerStyle={{backgroundColor : 'white',}}
                            tabBarOptions={{
                                labelStyle: { fontSize: 12,  padding : 0, margin : 0, marginBottom : 15, marginHorizontal : 20},
                                tabStyle: {width : 'auto',alignItems : 'center', padding : 0, justifyContent : 'flex-end', marginHorizontal : 0, paddingHorizontal : 3},
                                indicatorStyle : {borderWidth : 0.5},
                                
                            }}
                            
                        >
                            <Tab.Screen  name="incoming" component={TransactionRouter} />
                            <Tab.Screen  name="past" component={PastBooking} />
                            <Tab.Screen  name="canceled" component={CanceledBooking} />
                        </Tab.Navigator>
                    </View>
                </View>
        </Container>
    )
}

export default MyBooking






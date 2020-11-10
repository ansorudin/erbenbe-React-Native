import React from 'react'
import { Container, Icon } from 'native-base'
import { Image,StyleSheet ,SafeAreaView, View, Dimensions, Text, ImageBackground, TouchableOpacity, Animated   } from 'react-native'
import { ScrollView, } from 'react-native-gesture-handler'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DetailItem = ({name, address, location}) => {
    return (
        <View style={{alignItems : 'center', marginTop : -150}}>
            <View style={{ width : '85%'}}>
                <View style={{flexDirection : 'row'}}>
                    <Icon type='EvilIcons' name='location' style={{fontSize : 18, color : 'white'}} />
                    <Text style={{marginLeft : 3,fontWeight : '300', fontSize : 12, color : 'white'}}>{location}</Text>
                </View>

                <View style={{marginTop : 5, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between', width : '100%'}}>
                    <Text style={{fontSize : 25, fontWeight : '600', color : 'white', }}>
                        {name}
                    </Text>
                    <View style={{backgroundColor : 'rgba(150, 150, 150, 0.7)', flexDirection : 'row', alignItems : 'center',paddingHorizontal : 10,paddingVertical : 5, borderRadius : 15}}>
                        <Icon type='EvilIcons' name='exclamation' style={{fontSize : 25, color : '#99ddcc'}}/>
                        <Text style={{marginLeft : 5 ,fontWeight : '600', color : 'white'}}>
                            781 <Text style={{fontWeight : '300'}}>Visited</Text>
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{padding : 20,marginTop : 15,shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 2, height : windowHeight /3.4, width : '85%' , borderRadius : 15, backgroundColor : 'white'}}>
                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                    <View style={{flex : 2}}>
                        <Text style={{fontSize : 16, fontWeight : '600', marginBottom : 5}}>
                            Location
                        </Text>
                        <Text style={{fontSize : 13, fontWeight : '300',}}>
                            {address}
                        </Text>
                    </View>
                    <View style={{flex : 1, alignItems : 'flex-end' }}>
                        <View 
                        style={{shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 2,height : 60, width : 60,  justifyContent : 'center', alignItems : 'center'}}>
                            <Image source={require('./../../../../asset/maps.png')} style={{height : 60, width : 60, borderRadius : 10}} />
                            <Icon type='MaterialIcons' name="near-me" style={{position : 'absolute'}} />
                        </View>
                    </View>
                </View>

                <View style={{marginTop : 15}}>
                    <View style={{flexDirection : 'row', alignItems : 'center', marginBottom : 13}}>
                        <Text style={{fontSize : 16, fontWeight : '600'}}>
                            Aminities
                        </Text>
                        
                    </View>
                    <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '90%'}}>
                        <View style={{alignItems : 'center', justifyContent : 'center', height : 40, width : 40, borderWidth : 0.5, borderColor : '#6B8FF7',  backgroundColor : '#E2E9FD', borderRadius : 10, padding : 7 }}>
                            <Icon type='FontAwesome' name='coffee' style={{ fontSize : 20, color : '#6B8FF7'}} />
                        </View>
                        <View style={{alignItems : 'center', justifyContent : 'center', height : 40, width : 40, borderWidth : 0.5, borderColor : '#6B8FF7',  backgroundColor : '#E2E9FD', borderRadius : 10, padding : 7 }}>
                            <Icon type='FontAwesome' name='wifi' style={{ fontSize : 20, color : '#6B8FF7'}} />
                        </View>
                        <View style={{alignItems : 'center', justifyContent : 'center', height : 40, width : 40, borderWidth : 0.5, borderColor : '#6B8FF7',  backgroundColor : '#E2E9FD', borderRadius : 10, padding : 7 }}>
                            <Icon type='MaterialIcons' name='local-parking' style={{ fontSize : 20, color : '#6B8FF7'}} />
                        </View>
                        <View style={{alignItems : 'center', justifyContent : 'center', height : 40, width : 40, borderWidth : 0.5, borderColor : '#6B8FF7',  backgroundColor : '#E2E9FD', borderRadius : 10, padding : 7 }}>
                            <Icon type='MaterialIcons' name='fitness-center' style={{ fontSize : 20, color : '#6B8FF7'}} />
                        </View>
                        <View style={{alignItems : 'center', justifyContent : 'center', height : 40, width : 40, borderWidth : 0.5, borderColor : '#6B8FF7',  backgroundColor : '#E2E9FD', borderRadius : 10, padding : 7 }}>
                            <Icon type='MaterialIcons' name='pool' style={{ fontSize : 20, color : '#6B8FF7'}} />
                        </View>
                        <View style={{ alignItems : 'center', justifyContent : 'center', height : 40, width : 40, borderWidth : 0.5, borderColor : '#6B8FF7',  backgroundColor : '#E2E9FD', borderRadius : 10, padding : 7 }}>
                            <Text style={{fontSize : 12, color : '#6B8FF7' }}>+9</Text>
                        </View>
                    </View>
                </View>

                <View style={{marginTop : 20}}>
                    <View style={{flexDirection : 'row', alignItems : 'center', marginBottom : 13}}>
                        <Text style={{fontSize : 16, fontWeight : '600'}}>
                            Overview
                        </Text>
                    </View>

                    <View style={{flexDirection : 'row', width : '100%', justifyContent : 'space-around'}}>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <Text style={{fontSize : 16, marginRight : 2, fontWeight : '300'}}>4.8</Text>
                            <Icon type='MaterialIcons' name='star' style={{fontSize: 18, color: 'orange'}} />
                        </View>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <Text style={{fontSize : 16, marginRight : 2, fontWeight : '300'}}>16</Text>
                            <Text style={{fontSize : 16, marginRight : 2, fontWeight : '600', color : 'green'}}>Review</Text>
                        </View>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <Text style={{fontSize : 16, marginRight : 2, fontWeight : '300'}}>12</Text>
                            <Icon type='MaterialIcons' name='favorite' style={{fontSize: 18, color: 'salmon'}} />
                        </View>
                    </View>

                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default DetailItem

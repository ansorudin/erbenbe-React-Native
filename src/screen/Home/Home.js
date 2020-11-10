import { Icon } from 'native-base'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, TextInput} from 'react-native'
import CarouselHum from './CarouselHum'
import {getMostVisited, getPopularLocation} from './../../redux/actions/hotelsActions'
import {onTrue, onFalse} from './../../redux/actions/optionsActions'
import { connect } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker';


const Home = ({option, onTrue, navigation, mostVisited, getMostVisited, hotels, getPopularLocation, popularLocation}) => {
    const [location, setLocation] = useState('')
    
    useEffect(() => {
        getMostVisited()
        getPopularLocation()
        onTrue()

    },[])

    return (
        <ScrollView style={{backgroundColor : '#fff'}}>
            <View style={{padding : 20, marginTop : 70}}>
                <View style={{alignItems : 'center',flexDirection : 'row',justifyContent : 'space-between'}}>
                    <View>
                        <Text style={{fontWeight : '300', marginBottom : 5}}>Hello, Ansor</Text>
                        <Text style={{fontSize : 20, fontWeight : '600', letterSpacing : 0.5}}>Find Your Room</Text>
                    </View>
                    <View>
                        <Image 
                        style={{height : 70, width : 70, borderRadius : 10}}
                        source={require('./../../../asset/hotel1_1.jpeg')} />
                    </View>
                </View>

                <View style={{marginTop : 30, marginLeft : 15}}>
                    <View style={{
                        width : '80%',paddingVertical : 7,paddingHorizontal : 10,flexDirection : 'row', alignItems : 'center', 
                        backgroundColor : 'rgba(52,52,52,0.3)', borderRadius : 20, justifyContent : 'space-between'}}>
                        <TextInput 
                            onSubmitEditing={() => {navigation.navigate('datepicker', {location : location}), setLocation('')}}
                            onChangeText={(text) => setLocation(text)} 
                            value={location}
                            keyboardType='default' placeholder='Where are you going ?' 
                            placeholderTextColor='#fff' 
                            style={{marginLeft : 5, color : '#fff'}}/>
                        <Icon type='EvilIcons' name='search' style={{fontSize : 25, color : 'white'}}/>
                    </View>
                    <ScrollView
                        horizontal
                        style={{marginTop : 10}}
                        
                    >
                        <TouchableOpacity
                        style={{
                            flexDirection : 'row', backgroundColor : 'rgba(41, 171, 135, 0.7)', paddingVertical : 5, paddingLeft : 10, paddingRight : 15,
                            borderRadius : 10, marginRight : 5
                        }}
                        >
                            <Icon type='EvilIcons' name='location' style={{fontSize : 17, marginRight : 2,color : 'white', padding : 0}}/>
                            <Text style={{fontSize : 12, fontWeight : '300', color : 'white'}}>
                                Near You
                            </Text>
                        </TouchableOpacity>

                        {popularLocation.data && popularLocation.data.map((val, index) =>{
                            return(
                                <TouchableOpacity
                                onPress={()=> navigation.navigate('datepicker', {location : val.location})}
                                key={index}
                                style={{
                                    backgroundColor : 'rgba(255, 140, 105, 0.7)',
                                    borderRadius : 10, marginRight : 5,
                                    width : 90, alignItems : 'center', justifyContent : 'center'
                                }}
                                >
                                    <Text style={{fontSize : 12, fontWeight : '300', color : 'white'}}>
                                        {val.location}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}

                    </ScrollView>
                </View>

                <View style={{marginTop : 50}}>
                    <Text style={{fontSize : 18, fontWeight : '600', letterSpacing : 0.5, marginBottom : 20}}>Most Visited</Text>
                    <CarouselHum data={mostVisited.data} onPress={() => console.log(mostVisited.data.id)}/>
                </View>

                <View style={{marginTop : 30}}>
                    <Text style={{fontSize : 18, fontWeight : '600', letterSpacing : 0.5, marginBottom : 20}}>Popular Places</Text>
                    
                    <View style={{marginBottom : 200}}>
                        <View style={{alignItems : 'center', justifyContent : 'space-between', height : 300, flexDirection: 'row', flexWrap : 'wrap' , paddingHorizontal : 10, marginBottom : 100}}>
                            {popularLocation.data && popularLocation.data.map((val, index) => {
                                return(
                                    <View key={index} style={{}}>
                                        <Image 
                                        style={{height : 160, width : 165, borderRadius : 13, marginBottom : 20}}
                                        source={require('./../../../asset/hotel1_1.jpeg')} />

                                        <View style={{position : 'absolute', bottom : 35, left : 12}}>
                                            <Text style={{fontSize : 16, color : '#fff', fontWeight : '600'}}>
                                                {val.location}
                                            </Text>
                                            <Text style={{fontSize : 12, marginTop : 2, color : '#fff', fontWeight : '300'}}>
                                                ${val.price} / night avg.
                                            </Text>
                                        </View>
                                    </View>
                                )

                            })}
                            
                            <View style={{alignItems : 'center',justifyContent :'center',height : 100, width : 350, borderRadius : 13, marginBottom : 20, backgroundColor : 'salmon'}}>
                                <Text style={{fontWeight : '600', color : '#fff'}}>Holiday Deals</Text>
                                <Text style={{fontWeight : '300', fontSize : 12, marginTop : 4, color : '#fff'}}>20% until 31 December</Text>
                            </View>
                        </View>
                        
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return{
        mostVisited : state.mostVisited,
        hotels : state.hotels,
        popularLocation : state.location,
        option : state.option
    }
}

const mapDispatchToProps ={
    getMostVisited, getPopularLocation, onTrue, onFalse
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

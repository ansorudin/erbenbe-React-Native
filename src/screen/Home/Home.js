import { Icon } from 'native-base'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, TextInput} from 'react-native'
import CarouselHum from './CarouselHum'
import {getMostVisited, getPopularLocation} from './../../redux/actions/hotelsActions'
import { connect } from 'react-redux'
import { apiURL2 } from '../../constant/apiURL'


const Home = ({option,  navigation, mostVisited, getMostVisited, hotels, getPopularLocation, popularLocation}) => {
    const [location, setLocation] = useState('')
    
    useEffect(() => {
        getMostVisited()
        getPopularLocation()

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
                        <View style={{borderWidth : 1,marginRight : 10 , borderRadius : 10, padding : 1, borderColor : 'rgba(41, 171, 135, 0.7)'}}>
                            <View
                            style={{
                                flexDirection : 'row', backgroundColor : 'rgba(41, 171, 135, 0.7)', paddingVertical : 5, paddingLeft : 10, paddingRight : 15,
                                borderRadius : 10, alignItems : 'center'
                            }}
                            >
                                <Icon type='EvilIcons' name='location' style={{fontSize : 17, marginRight : 4,color : 'white', padding : 0}}/>
                                <Text style={{fontSize : 14, fontWeight : '300', color : 'white'}}>
                                    Near you
                                </Text>
                            </View>
                        </View>

                        {popularLocation.data && popularLocation.data.map((val, index) =>{
                            return(
                                <TouchableOpacity 
                                onPress={() => navigation.navigate('datepicker', {location : val.location})}
                                key={index} style={{borderWidth : 1, marginHorizontal : 5, borderRadius : 10, padding : 1, borderColor : 'rgba(250,128,114 ,0.7)'}}>
                                    <View
                                    style={{
                                        flexDirection : 'row', backgroundColor : 'rgba(250,128,114 , 0.7)', paddingVertical : 5, paddingLeft : 10, paddingRight : 15,
                                        borderRadius : 10, alignItems : 'center', justifyContent : 'center'
                                    }}
                                    >
                                        <Text style={{fontSize : 14, fontWeight : '300', color : 'white'}}>
                                            {val.location}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}

                    </ScrollView>
                </View>

                <View style={{marginTop : 50}}>
                    <Text style={{fontSize : 18, fontWeight : '600', letterSpacing : 0.5, marginBottom : 20}}>Most Visited</Text>
                    <CarouselHum data={mostVisited.data} navigation={navigation}/>
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
                                        source={{uri : apiURL2 + '/public/city-images/' + val.image_location}} />

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
    getMostVisited, getPopularLocation, 
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

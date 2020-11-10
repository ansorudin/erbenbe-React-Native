import { Button, Container, Content, Header, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Dimensions, Modal, SafeAreaView } from 'react-native';
import { View } from 'react-native-animatable'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import CardComponent from '../component/CardComponent/CardComponent'
import {getAllHotels, sortHotelByPriceAsc} from '../redux/actions/hotelsActions'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Home = ({hotels, getAllHotels, sortHotelByPriceAsc}) => {
    
    useEffect(() => {
        getAllHotels()
    }, [])
    

    const renderData = () => {
        return hotels.data.map((val, index) => {
            return(
                <CardComponent onPress={() => console.log(val.id)} name={val.name} lokasi={val.address} key={index} harga={val.price} image={val.url}/>
            )
        })
    }

    return (
        <Container >
            <SafeAreaView>
                <View style={{height : windowHeight /3, alignItems : 'center', marginTop : 20}}>
                    <TextInput
                    placeholder='Where are you going ?' 
                    style={{borderWidth : 1, padding : 8, width : windowWidth / 1.15, borderRadius : 10}}
                    />
                </View>
                <Button onPress={sortHotelByPriceAsc}>
                    <Text>Sort By Price</Text>
                </Button>
                
            </SafeAreaView>
            <ScrollView style={{}}  >
                <View 
                style={{alignItems : 'center', borderWidth : 1, borderTopLeftRadius : 20, borderTopRightRadius : 20}}
                
                >
                    <View style={{borderBottomWidth : 0.3, width : windowWidth / 1.15, paddingVertical : 20, alignItems : 'center'}}>
                        <Text style={{fontWeight : '600'}}>
                            300+ places to stay
                        </Text>
                    </View>
                    <View style={{width : windowWidth / 1.15, marginTop : 30, marginBottom : 40}}>
                        <Text style={{fontSize : 14, fontWeight : '600'}}>
                            Your trip is coming up in 3 days. 
                        <Text style={{fontSize : 14, fontWeight : '300'}}>
                            Use the Instant Book filter to check out places that you can book right now.
                        </Text>
                        </Text>
                    </View>
                    {hotels.data ? renderData() : <Text>Loading</Text>}
                </View>
            </ScrollView>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        hotels : state.hotels
    }
}

const mapDispatchToProps ={
    getAllHotels, sortHotelByPriceAsc
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

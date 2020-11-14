import { Icon } from 'native-base'
import React from 'react'
import {Dimensions,Animated,Text ,SafeAreaView, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { View } from 'react-native-animatable'
import { Children } from 'react/cjs/react.production.min'
import { apiURL2 } from '../../constant/apiURL'
import { tutorial2Spec } from './../../latihan/theme'


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ITEM_WIDTH = windowWidth * 0.58
const ITEM_HEIGHT = ITEM_WIDTH * 1.5
const SPACING = 10
const FULL_SIZE = ITEM_WIDTH + SPACING * 2


const CarouselHum = ({data, onPress, navigation}) => {
    const scrollX = React.useRef(new Animated.Value(0)).current

    
    return (
            <Animated.FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                snapToInterval={FULL_SIZE}
                decelerationRate='fast'
                onScroll={Animated.event(
                    [{nativeEvent : {contentOffset : {x : scrollX}}}],
                    {useNativeDriver : true}
                )}
                keyExtractor={item => item.id.toString()}
                renderItem={({item, index}) => {
                    const inputRange =[
                        (index - 1) * FULL_SIZE,
                        index * FULL_SIZE,
                        (index + 1) * FULL_SIZE,
                    ]

                    const translateX = scrollX.interpolate({
                        inputRange,
                        outputRange : [ITEM_WIDTH, 0, -ITEM_WIDTH]
                    })

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange : [1, 1.1, 1]
                    })
                    return <TouchableOpacity
                        onPress={() => navigation.navigate('hoteldetail', {id : item.id, startDate : '2020-11-30', endDate : '2020-12-01'})}
                        style={styles.itemContainer}
                    >
                        <View style={[StyleSheet.absoluteFillObject, {overflow : 'hidden', borderRadius : 10}]}>
                            <Animated.Image 
                            source={{uri : apiURL2 + '/public/hotel-images/' + item.url}} 
                            style={[StyleSheet.absoluteFillObject, {resizeMode : 'cover', transform : [{scale}]}]}
                            />
                           
                            <View style={[styles.days]}>
                                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                    <Icon type='EvilIcons' name='location' style={{fontSize : 18, color : 'white'}} />
                                    <Text style={{marginLeft : 3,fontWeight : '300', fontSize : 12, color : 'white'}}>{item.location}</Text>
                                </View>

                                <View style={{marginTop : 3,flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between', width : ITEM_WIDTH * 0.8}}>
                                    <Text style={{color : '#fff', fontSize : 18, fontWeight : '600'}}>
                                        {item.name}
                                    </Text>
                                    {/* <View style={{flexDirection : 'row', alignItems : 'flex-end'}}>
                                        <Icon type='MaterialIcons' name='star' style={{fontSize: 16, color: 'salmon'}} />
                                        <Text style={{fontSize : 12, marginHorizontal : 3, color : '#fff'}}>4.88</Text>
                                    </View> */}
                                </View>
                            </View>

                            <View style={styles.location}>
                                <View style={{paddingLeft : 5,paddingRight : 10,height : 25,width : 100,backgroundColor : 'rgba(150, 150, 150, 0.4)', flexDirection : 'row', alignItems : 'center', justifyContent :'space-around', borderRadius : 15}}>
                                    <Icon type='EvilIcons' name='exclamation' style={{fontSize : 20, color : '#99ddcc'}}/>
                                    <Text style={{marginLeft : 5 ,fontWeight : '600', color : 'white', fontSize : 12}}>
                                        {item.visited} <Text style={{fontWeight : '300'}}>Visited</Text>
                                    </Text>
                                </View>
                                <Icon type='EvilIcons' name='heart' style={{color : '#fff'}} />
                            </View>
                            
                            
                            
                        </View>
                    </TouchableOpacity>
                }}
            
            
            />
    )
}

const styles = StyleSheet.create({
    itemContainer:{
        width : ITEM_WIDTH, // ITEM_WIDTH
        height : ITEM_HEIGHT, //ITEM
        margin : SPACING,
        
    },
    location : {
        fontSize : 30,
        color : '#fff',
        fontWeight : '800',
        width : ITEM_WIDTH * 0.88,
        position : 'absolute',
        top : 15,
        left : 14,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    days : {
        position : 'absolute',
        bottom : 18,
        left : 14,
        justifyContent : 'center'
    }
})

export default CarouselHum

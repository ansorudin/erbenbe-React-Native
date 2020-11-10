import React from 'react'
import {Animated,Text ,SafeAreaView, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { View } from 'react-native-animatable'
import { apiURL2 } from '../../../constant/apiURL'
import { tutorial2Spec } from './../../../latihan/theme'
const {ITEM_HEIGHT, ITEM_WIDTH, RADIUS, SPACING, FULL_SIZE} = tutorial2Spec


const CarouselDetailRoom = ({images}) => {
    const scrollX = React.useRef(new Animated.Value(0)).current
    return (
        <View>
            <Animated.FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data={images}
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
                        onPress={() => {}} 
                        style={styles.itemContainer}
                    >
                        <View style={[StyleSheet.absoluteFillObject, {overflow : 'hidden', borderRadius : 10}]}>
                            <Animated.Image 
                            source={{uri : apiURL2 + '/public/room-images/' + item.url}} 
                            style={[StyleSheet.absoluteFillObject, {resizeMode : 'cover', transform : [{scale}]}]}
                            />
                            <View style={[styles.days, {transform : [{translateX}]}]}>
                                <Text style={styles.daysValue}>Bedroom</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                }}
            
            
            />
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer:{
        width : ITEM_WIDTH,
        height : ITEM_HEIGHT,
        margin : SPACING
    },
    location : {
        fontSize : 30,
        color : '#fff',
        fontWeight : '800',
        width : ITEM_WIDTH * 0.8,
        position : 'absolute',
        top : SPACING,
        left : SPACING
    },
    days : {
        position : 'absolute',
        bottom : SPACING,
        left : SPACING,
        width : 80,
        borderRadius : 10,
        height : 30,
        backgroundColor : 'rgba(52,52,52,0.6)',
        justifyContent : 'center',
        alignItems : 'center'
    },
    daysValue : {
        color : '#fff',
        fontSize : 12
    }
})

export default CarouselDetailRoom


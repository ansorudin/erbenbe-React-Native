import React from 'react'
import {Animated,Text ,SafeAreaView, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { View } from 'react-native-animatable'
import { tutorial2Spec } from './theme'
const {ITEM_HEIGHT, ITEM_WIDTH, RADIUS, SPACING, FULL_SIZE} = tutorial2Spec

const images = [
    {
        id : 1,
        image : 'https://images.unsplash.com/photo-1604061717335-c901536abfaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    },
    {
        id : 2,
        image : 'https://images.unsplash.com/photo-1569119523023-81ee19ceeb7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2102&q=80',
    },
    {
        id : 3,
        image : 'https://images.unsplash.com/photo-1569119549561-60eea1194a21?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    },
    {
        id : 4,
        image : 'https://images.unsplash.com/photo-1578592299806-90109a85febf?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    },
    {
        id : 5,
        image : 'https://images.unsplash.com/photo-1581967600327-29c5cdc8095e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
    }]



const LatianParalacCarousel = () => {
    const scrollX = React.useRef(new Animated.Value(0)).current
    return (
        <SafeAreaView style={{flex : 1}}>
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
                        <View style={[StyleSheet.absoluteFillObject, {overflow : 'hidden'}]}>
                            <Animated.Image 
                            source={{uri : item.image}} 
                            style={[StyleSheet.absoluteFillObject, {resizeMode : 'cover', transform : [{scale}]}]}
                            />
                            <Animated.Text style={[styles.location, {transform : [{translateX}]}]}>ini Text</Animated.Text>
                            <View style={styles.days}>
                                <Text style={styles.daysValue}>20</Text>
                                <Text style={styles.daysLabel}>days</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                }}
            
            
            />
        </SafeAreaView>
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
        width : 52,
        height : 52,
        borderRadius : 26,
        backgroundColor : 'tomato',
        justifyContent : 'center',
        alignItems : 'center'
    },
    daysValue : {
        fontWeight : '800',
        color : '#fff',
        fontSize : 18
    },
    daysLabel : {
        color : '#fff',
        fontSize : 18
    }
})

export default LatianParalacCarousel

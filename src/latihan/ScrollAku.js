import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, PanResponder, ScrollView, View, Image, Text} from 'react-native'
import {Icon} from 'native-base'


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const ScrollAku = () => {

    const [isScrollEnabled, setIsScrollEnabled] = useState(false)
    const [scrollOffset, setScrollOffset] = useState(0)

    const animation = useRef(new Animated.ValueXY({ x:0, y : SCREEN_HEIGHT - 90})).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder : (evt, gestureState) =>{
                if((isScrollEnabled && scrollOffset <=  0 && gestureState.dy > 0) || 
                 !isScrollEnabled && gestureState.dy < 0){
                    return true
                }else{
                    return false
                }
            },
            onPanResponderGrant : (evt, gestureState) => {
                animation.extractOffset()
            },
            onPanResponderMove: Animated.event(
                [
                  null,
                  {dy: animation.y }
                  
                ],
                {useNativeDriver : false},
            ),
            onPanResponderRelease : (evt, gestureState) => {
                if(gestureState.moveY > SCREEN_HEIGHT -120){
                    Animated.spring(animation.y, {
                        toValue : 0,
                        tension : 1,
                        useNativeDriver:false //Add this line
                    }).start()
                }
                else if(gestureState.moveY < 120) {
                    Animated.spring(animation.y, {
                        toValue : 0,
                        tension : 1,
                        useNativeDriver:false //Add this line
                    }).start()
                }
                else if(gestureState.dy < 0){
                    setIsScrollEnabled(true)
                    Animated.spring(animation, {
                        // toValue : -SCREEN_HEIGHT + 120,
                        toValue : {x : 0, y : -SCREEN_HEIGHT + 120},
                        tension : 1,
                        useNativeDriver:false //Add this line
                    }).start()
                }else if(gestureState.dy > 0){
                    setIsScrollEnabled(false)
                    Animated.spring(animation, {
                        // toValue : SCREEN_HEIGHT - 120,
                        toValue : {x : 0, y : SCREEN_HEIGHT - 120 },
                        tension : 1,
                        useNativeDriver : false
                    }).start()
                }
            }
        })
      ).current;

    const animationHeight = {
        transform : animation.getTranslateTransform()
    }
    const animatedImageHeight = animation.y.interpolate({
        inputRange : [0, SCREEN_HEIGHT - 90],
        outputRange : [200, 32],
        extrapolate : 'clamp'
    })
    const animatedSongTitleOpacity = animation.y.interpolate({
        inputRange : [0, SCREEN_HEIGHT -500 ,SCREEN_HEIGHT - 90],
        outputRange : [0,0, 1],
        extrapolate : 'clamp'
    })
    const animatedImageMarginLeft = animation.y.interpolate({
        inputRange : [0,SCREEN_HEIGHT - 90],
        outputRange : [SCREEN_WIDTH /2 - 100, 10],
        extrapolate : 'clamp'
    })
    const animatedHeaderHeight = animation.y.interpolate({
        inputRange : [0,SCREEN_HEIGHT - 90],
        outputRange : [SCREEN_HEIGHT /2 , 90],
        extrapolate : 'clamp'
    })
    const animatedSongDetailOpacity = animation.y.interpolate({
        inputRange : [0, SCREEN_HEIGHT -500 ,SCREEN_HEIGHT - 90],
        outputRange : [1,0, 0],
        extrapolate : 'clamp'
    })
    return (
        
        <Animated.View style={{flex : 1, backgroundColor : 'white'}}>
                <Animated.View 
                    {...panResponder.panHandlers}
                    style={[ animationHeight, {
                    position : 'absolute', left : 0, right : 0, zIndex : 10,
                    backgroundColor : 'white', height : SCREEN_HEIGHT
                }]}
                >
                    <ScrollView
                        scrollEnabled={isScrollEnabled}
                        scrollEventThrottle={16}
                        onScroll={event => {
                            setScrollOffset(event.nativeEvent.contentOffset.y)
                        }}
                    >
                    <Animated.View 
                    style={{
                        height : animatedHeaderHeight, borderTopWidth : 1, borderTopColor : '#ebe5e5',
                        flexDirection : 'row', alignItems : 'center'
                    }}>
                        <View style={{flex : 4, flexDirection : 'row', alignItems : 'center'}}>
                            <Animated.View style={{height : animatedImageHeight, width : animatedImageHeight, marginLeft : animatedImageMarginLeft}}>
                                <Image style={{flex : 1, width : null, height : null}}
                                source={require('./../../../asset/image1.jpg')}
                                />
                            </Animated.View>
                            <Animated.Text style={{opacity : animatedSongTitleOpacity, fontSize : 18, paddingLeft : 10}}>
                                Hotel California(Live)
                            </Animated.Text>
                        </View>
                        <Animated.View style={{opacity : animatedSongTitleOpacity, flex : 1, flexDirection : 'row', justifyContent : 'space-around'}}>
                            <Icon type='MaterialIcons' name='pause'/>
                            <Icon type='MaterialIcons' name='play-arrow'/>
                        </Animated.View>
                    </Animated.View>

                    <Animated.View style={{height : animatedHeaderHeight, opacity : animatedSongDetailOpacity}}>

                        <View style={{flex : 1, alignItems : 'center', justifyContent : 'flex-end'}}>
                            <Text style={{fontWeight : 'bold', fontSize : 22}}>Hotel California(Live)</Text>
                            <Text style={{fontSize : 18}}>Eagles - Hell Freezes Over</Text>
                        </View>


                        <View style={{flex : 2, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-around'}}>
                            <Icon type='MaterialIcons' name='skip-previous' style={{fontSize : 40}}/>
                            <Icon type='MaterialIcons' name='pause' style={{fontSize : 50}}/>
                            <Icon type='MaterialIcons' name='skip-next' style={{fontSize : 40}}/>
                        </View>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 20, paddingBottom : 20}}>
                            <Icon type="MaterialIcons" name='add' style={{fontSize : 32}} />
                            <Icon type="MaterialIcons" name='more-vert' style={{fontSize : 32}} />
                        </View>
                    </Animated.View>
                    <View style={{height : 20000}}></View>
                    </ScrollView>
                </Animated.View>
                
            </Animated.View>
    )
}

export default ScrollAku

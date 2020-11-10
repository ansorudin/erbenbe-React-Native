import { Icon } from 'native-base'
import React, { Component } from 'react'
import { 
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    PanResponder,
    ScrollView,
    Image,
} from 'react-native'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


class Test extends Component{

    state ={
        isScrollEnabled : false
    }


    UNSAFE_componentWillMount(){

        this.scrollOffset = 0
        this.animation = new Animated.ValueXY({ x:0, y : SCREEN_HEIGHT - 90})


        this.panResponder = PanResponder.create({

            onMoveShouldSetPanResponder : (evt, gestureState) => {
                if((this.state.isScrollEnabled && this.scrollOffset <=  0 && gestureState.dy > 0) || 
                 !this.state.isScrollEnabled && gestureState.dy < 0){
                    return true
                }else{
                    return false
                }
            },
            onPanResponderGrant : (evt, gestureState) => {
                this.animation.extractOffset
            },
            onPanResponderMove : (evt, gestureState) => {
                this.animation.setValue({x : 0, y : gestureState.dy})
            },
            onPanResponderRelease : (evt, gestureState) => {
                if(gestureState.moveY > SCREEN_HEIGHT -120){
                    Animated.spring(this.animation.y, {
                        toValue : 0,
                        tension : 1,
                        useNativeDriver:false //Add this line
                    }).start()
                }
                else if(gestureState.moveY < 120) {
                    Animated.spring(this.animation.y, {
                        toValue : 0,
                        tension : 1,
                        useNativeDriver:false //Add this line
                    }).start()
                }
                else if(gestureState.dy < 0){
                    this.setState({isScrollEnabled : true})
                    Animated.spring(this.animation, {
                        // toValue : -SCREEN_HEIGHT + 120,
                        toValue : {x : 0, y : -SCREEN_HEIGHT + 120},
                        tension : 1,
                        useNativeDriver:false //Add this line
                    }).start()
                }else if(gestureState.dy > 0){
                    this.setState({isScrollEnabled : false})
                    Animated.spring(this.animation, {
                        // toValue : SCREEN_HEIGHT - 120,
                        toValue : {x : 0, y : SCREEN_HEIGHT - 120 },
                        tension : 1,
                        useNativeDriver : false
                    }).start()
                }
            }
        })
    }



    render(){

        const animationHeight = {
            transform : this.animation.getTranslateTransform()
        }
        animatedImageHeight = this.animation.y.interpolate({
            inputRange : [0, SCREEN_HEIGHT - 90],
            outputRange : [200, 32],
            extrapolate : 'clamp'
        })
        animatedSongTitleOpacity = this.animation.y.interpolate({
            inputRange : [0, SCREEN_HEIGHT -500 ,SCREEN_HEIGHT - 90],
            outputRange : [0,0, 1],
            extrapolate : 'clamp'
        })
        animatedImageMarginLeft = this.animation.y.interpolate({
            inputRange : [0,SCREEN_HEIGHT - 90],
            outputRange : [SCREEN_WIDTH /2 - 100, 10],
            extrapolate : 'clamp'
        })
        animatedHeaderHeight = this.animation.y.interpolate({
            inputRange : [0,SCREEN_HEIGHT - 90],
            outputRange : [SCREEN_HEIGHT /2 , 90],
            extrapolate : 'clamp'
        })
        animatedSongDetailOpacity = this.animation.y.interpolate({
            inputRange : [0, SCREEN_HEIGHT -500 ,SCREEN_HEIGHT - 90],
            outputRange : [1,0, 0],
            extrapolate : 'clamp'
        })
         
        return(
            <Animated.View style={{flex : 1, backgroundColor : 'white'}}>
                <Animated.View 
                    {...this.panResponder.panHandlers}
                    style={[ animationHeight, {
                    position : 'absolute', left : 0, right : 0, zIndex : 10,
                    backgroundColor : 'white', height : SCREEN_HEIGHT
                }]}
                >
                    <ScrollView
                        scrollEnabled={this.state.isScrollEnabled}
                        scrollEventThrottle={16}
                        onScroll={event => {
                            this.scrollOffset = event.nativeEvent.contentOffset.y
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
}

export default Test

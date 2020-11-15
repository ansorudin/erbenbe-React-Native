import { Button, Container, Content, Text, View } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { ImageBackground, Dimensions, Image } from 'react-native'
import {image1, logo} from './../../support/image'
import styles from './GetStartedStyle'
import * as Animatable from 'react-native-animatable';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GetStarted = ({navigation}) => {

    return (
        <Container>
            <ImageBackground
            source={image1}
            style={{width : windowWidth, height : windowHeight}}
            >
                <Content style={{padding : 30, }}>
                    <Animatable.View 
                    style={{alignItems : 'center', justifyContent : 'flex-end', height : windowHeight /1.2}}
                    animation='fadeInUp'
                    >

                        <Animatable.View
                        animation='bounce'
                        delay={500}
                        easing='ease-out'
                        iterationCount='infinite'
                        iterationDelay={1000}
                        >
                            <Text style={{fontSize : 40, fontWeight : 'bold', color : '#f6ab6c', letterSpacing : 4}}>
                                BUBUYUQ
                            </Text>
                            <Text style={styles.logo}>
                                BUBUYUQ
                            </Text>
                        </Animatable.View>
                        
                        <Animatable.Text 
                        animation='rubberBand'
                        delay={1000}
                        easing='ease-out'
                        iterationCount='infinite'
                        iterationDelay={1000}
                        style={{letterSpacing : 1, fontSize : 12, fontWeight : '300'}}>
                            Best hotel deals for your holiday
                        </Animatable.Text>
                        
                        <View 
                        
                        style={{width : '100%', alignItems : 'center'}}>
                            <Button 
                            block 
                            onPress={() => navigation.navigate('register')}
                            style={{borderRadius : 20, marginTop : 200, backgroundColor : '#f6ab6c'}}
                            >
                                <Text style={{fontWeight : '400'}}>
                                    Get Started
                                </Text>
                            </Button>
                            
                            <Text 
                            style={{marginTop : 50, color : 'white', fontSize : 13, fontWeight : '600'}}
                            onPress={() => navigation.navigate('login')}>
                                Already Have Account ? Log in
                            </Text>
                        </View>
                    </Animatable.View>
                </Content>
            </ImageBackground>
        </Container>
    )
}

export default GetStarted

import { Button, Container, Content, Form, Input, Item, Label, Text, View } from 'native-base'
import React, { useState } from 'react'
import styles from './LoginStyle'
import {connect} from 'react-redux'
import {onUserLogin, onErrorDelete, onEmailChange, onPasswordChange} from './../../redux/actions/userActions'
import {Dimensions, ImageBackground, SafeAreaView} from 'react-native'
import {image3} from './../../support/image'
import * as Animatable from 'react-native-animatable';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Login = ({navigation, user, onUserLogin, onErrorDelete, onEmailChange, onPasswordChange}) => {

    const onButtonSubmit = () => {
       onUserLogin(user.email, user.password)
    }

    return (
        <Container style={{justifyContent : 'flex-end'}}>
            <ImageBackground
                source={image3}
                style={{height : windowHeight, zIndex : -1}}
            >
                <View style={{height : windowHeight/2}}>
                    <View style={{padding : 30}}>
                        <SafeAreaView>
                            <View style={{justifyContent : 'flex-end',height : '100%'}}>
                                <Animatable.Text 
                                animation='bounceIn'
                                delay={500}
                                style={{fontSize : 40, fontWeight : 'bold', letterSpacing : 1, color : '#f6cd61', textShadowColor : '#8fcfd1', textShadowOffset : { width: 0, height: 1 }, textShadowRadius: 1, }}>
                                   Welcome Back
                                </Animatable.Text>
                                <Animatable.Text 
                                animation='bounceInLeft'
                                delay={800}
                                style={{fontSize : 13, marginTop : 10, color : 'white', marginBottom : 15}}>
                                    Book one of our unique hotel to escape the ordinary
                                </Animatable.Text>
                            </View>
                        </SafeAreaView>
                    </View>
                </View>

                <Animatable.View 
                style={{flex : 1, borderTopLeftRadius : 40, borderTopRightRadius : 40, padding : 30, backgroundColor : 'white'}}
                animation='fadeInUp'
                >
                    <Form style={[styles.formContainer, {marginTop : 15}]}>
                        <Item stackedLabel style={{marginLeft : 0}}>
                            <Label 
                            style={user.email ? [styles.label]  : [styles.label, {display : 'none'}] }>
                            Email
                            </Label>
                            <Input 
                                placeholder="Enter your email" 
                                style={[styles.containerInput]} 
                                value={user.email} 
                                onChangeText={onEmailChange}
                                autoCapitalize='none'/>
                                
                        </Item>

                        <Item stackedLabel style={{marginLeft : 0}} >
                            <Label 
                                style={user.password ? [styles.label] : [styles.label, {display : 'none'}] }>
                                Password
                            </Label>
                            <Input 
                                placeholder= "Enter password"
                                style={[styles.containerInput]} 
                                value={user.password} 
                                onChangeText={onPasswordChange} />
                        </Item>

                        <View style={{alignItems : 'flex-end'}}>
                            <Text style={{marginTop : 14, fontSize : 13, fontWeight : '500'}}>
                                Forgot password
                            </Text>
                        </View>
                    </Form>


                    <Button 
                    block onPress={onButtonSubmit}
                    disabled={user.email && user.password && !user.loading ? false : true}
                    style={{borderRadius : 10, backgroundColor : '#f6ab6c'}}>
                        <Text style={{fontSize : 16, fontWeight : '500'}}>
                            Sign In
                        </Text>
                    </Button>

                    <Text>{user.error && user.error}</Text>

                    <View style={{marginTop : 70, alignItems : 'center'}}>
                        <Text 
                        onPress={() => {navigation.push('register'), onErrorDelete()}}
                        style={{fontSize : 14}}
                        >
                            Don't have an account ? Register here
                        </Text>
                    </View>
                </Animatable.View>
            </ImageBackground>
        </Container>
    )
}

const mapDispatchToProps = {
    onUserLogin, 
    onErrorDelete,
    onEmailChange,
    onPasswordChange
}

const mapStateToProps = (state) => {
    return{
        user : state.user
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)

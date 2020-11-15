import { Button, Container, Content, Form, Input, Item, Label, Text, View } from 'native-base'
import React, { useState } from 'react'
import styles from './RegisterStyle'
import {connect} from 'react-redux'
import {onUserRegister, onErrorDelete} from './../../redux/actions/userActions'
import {Dimensions, ImageBackground, SafeAreaView, StatusBar} from 'react-native'
import {image2} from './../../support/image'
import * as Animatable from 'react-native-animatable';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Register = ({navigation, user, onUserRegister, onErrorDelete}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [passError, setPassError] = useState('')


    const onButtonSubmit = () => {
        onUserRegister(email, password)
    }

    const changeEmail = (text) => {
        setEmail(text)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
          setError('error');
        }else{
            setError('yes')
        }
    }

    const changePassword = (text) => {
        setPassword(text)
        if(password.length < 8){
            setPassError('error')
        }else{
            setPassError('yes')
        }
    }


    return (
        <Container style={{justifyContent : 'flex-end'}}>
            <ImageBackground
                source={image2}
                style={{height : windowHeight, zIndex : -1}}
            >
                <View style={{height : windowHeight/2}}
                >
                    <View style={{padding : 30}}>
                        <SafeAreaView>
                            <View style={{justifyContent : 'flex-end',height : '100%'}}>
                                <Animatable.Text 
                                animation='bounceIn'
                                delay={500}
                                style={{fontSize : 40, fontWeight : 'bold', letterSpacing : 1, color : '#f6cd61', textShadowColor : '#8fcfd1', textShadowOffset : { width: 0, height: 1 }, textShadowRadius: 1, }}>
                                    Join and find best deals for you
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
                style={{flex : 1, borderTopLeftRadius : 40, borderTopRightRadius : 40, padding : 30, backgroundColor : '#fff'}}
                animation='fadeInUp'
                >
                    <Form style={[styles.formContainer, {marginTop : 10}]}>
                        <Item stackedLabel style={{marginLeft : 0}} success={error === 'yes'} error={error === 'error'}>
                            <Label 
                            style={email && error === 'error' ? [styles.label, {color : 'red'}] : email || error === 'yes' ? [styles.label, {color : 'green'}] :  error === 'error' ? [styles.label, {color : 'red'}] : [styles.label, {display : 'none'}] }>
                            Email
                            </Label>
                            <Input 
                                placeholder={error === 'error' ? '' : "Enter your email" }
                                style={error === 'error' ? [styles.containerInput, {color : 'red'}] : [styles.containerInput, {color : 'green'}]} 
                                placeholderTextColor={error === 'error' ? 'red' : '#707070' }
                                value={email} 
                                onChangeText={text => changeEmail(text)}
                                autoCapitalize='none' />
                                
                        </Item>

                        <Item stackedLabel style={{marginLeft : 0}} success={passError === 'yes'} error={passError === 'error'}>
                            <Label 
                                style={password && passError === 'error' ? [styles.label, {color : 'red'}] : password || passError === 'yes' ? [styles.label, {color : 'green'}] :  passError === 'error' ? [styles.label, {color : 'red'}] : [styles.label, {display : 'none'}] }>
                                Password
                            </Label>
                            <Input 
                                placeholder={passError === 'error' ? '' : "Enter password" }
                                style={passError === 'error' ? [styles.containerInput, {color : 'red'}] : [styles.containerInput, {color : 'green'}]} 
                                value={password} 
                                placeholderTextColor={passError === 'error' ? 'red' : '#707070' }
                                onChangeText={text => changePassword(text)} 
                                secureTextEntry/>
                        </Item>
                        <Text style={{marginTop : 14, fontSize : 12, fontWeight : '300'}}>
                            We'll send email to confirm your mail. Standard message and data rates apply.
                        </Text>
                    </Form>


                    <Button 
                    block onPress={onButtonSubmit}
                    disabled={email && password && !user.loading ? false : true}
                    style={{borderRadius : 10, backgroundColor : '#f6ab6c'}}>
                        <Text style={{fontSize : 16, fontWeight : '500'}}>
                            Register
                        </Text>
                    </Button>
                    <Text>{user.error && user.error}</Text>

                    <View style={{marginTop : 60, alignItems : 'center'}}>
                        <Text 
                        onPress={() => {navigation.push('login'), onErrorDelete()}}
                        style={{fontSize : 14}}
                        >
                            Already have an Account ? Login here
                        </Text>
                    </View>
                </Animatable.View>
            </ImageBackground>     
        </Container>
    )
}

const mapDispatchToProps = {
    onUserRegister, onErrorDelete 
}

const mapStateToProps = (state) => {
    return{
        user : state.user
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register)

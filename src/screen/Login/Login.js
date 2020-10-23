import Axios from 'axios'
import { Button, Container, Content, Form, Input, Item, Label, Text, View } from 'native-base'
import React, { useState } from 'react'
import { apiURL } from '../../constant/apiURL'
import styles from './LoginStyle'

const Login = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 


    const onButtonSubmit = () => {
        try {
            if(!email || !password) throw new Error('Email or Password not be null')
            Axios.post(apiURL + '/auth/login', {email : email, password : password})
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const changeEmail = (text) => {
        setEmail(text)

    }

    const changePassword = (text) => {
        setPassword(text)
    }


    return (
        <Container>
            <Content style={{padding : 30}}>
                <View style={{alignItems : 'center'}}>
                    <Text style={{fontSize : 20, fontWeight : 'bold'}}>Welcome Back</Text>
                </View>
                <Form style={styles.formContainer}>
                    <Item stackedLabel style={{marginLeft : 0}}>
                        <Label 
                        style={email ? [styles.label]  : [styles.label, {display : 'none'}] }>
                        Email
                        </Label>
                        <Input 
                            placeholder="Enter your email" 
                            style={[styles.containerInput]} 
                            value={email} 
                            onChangeText={text => changeEmail(text)} />
                            
                    </Item>

                    <Item stackedLabel style={{marginLeft : 0}} >
                        <Label 
                            style={password ? [styles.label] : [styles.label, {display : 'none'}] }>
                            Password
                        </Label>
                        <Input 
                            placeholder= "Enter password"
                            style={[styles.containerInput]} 
                            value={password} 
                            onChangeText={text => changePassword(text)} secureTextEntry/>
                    </Item>

                    <View style={{alignItems : 'flex-end'}}>
                        <Text style={{marginTop : 14, fontSize : 13, fontWeight : '500'}}>
                            Forgot password
                        </Text>
                    </View>
                </Form>


                <Button 
                block onPress={onButtonSubmit}
                disabled={email && password ? false : true}
                style={{borderRadius : 10}}>
                    <Text style={{fontSize : 16, fontWeight : '500'}}>
                        Sign In
                    </Text>
                </Button>

                <View style={{marginTop : 20, alignItems : 'center'}}>
                    <Text 
                    onPress={() => navigation.navigate('register')}
                    style={{fontSize : 14}}
                    >
                        Don't have an account ? Register here
                    </Text>
                </View>
            </Content>
        </Container>
    )
}

export default Login

import Axios from 'axios'
import { Button, Container, Content, Form, Icon, Input, Item, Label, Text, View } from 'native-base'
import React, { useState } from 'react'
import { apiURL } from '../../constant/apiURL'
import styles from './RegisterStyle'
import {connect} from 'react-redux'
import { addCounter, minCounter } from '../../redux/actions/counterActions'

const Register = ({navigation, bebas, addCounter, minCounter}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [passError, setPassError] = useState('')


    const onButtonSubmit = () => {
        try {
            if(!email || !password) throw new Error('Email or Password not Complete')
            Axios.post(apiURL + '/auth/register', {email : email, password : password})
            .then((res) => {
                console.log(res.data)
                if(res.data.error === true){
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })

        } catch (error) {
            console.log(error)
        }
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
        <Container>
            <Content style={{padding : 30}}>
                <View style={{alignItems : 'center'}}>
                    <Text style={{fontSize : 20, fontWeight : 'bold'}}>Sign Up {bebas.haha}</Text>
                </View>
                <Form style={styles.formContainer}>
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
                            onChangeText={text => changeEmail(text)} />
                            
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
                            onChangeText={text => changePassword(text)} />
                    </Item>
                    <Text style={{marginTop : 14, fontSize : 12, fontWeight : '300'}}
                    onPress={addCounter}>
                        We'll send email to confirm your mail. Standard message and data rates apply.
                    </Text>
                    <Text style={{marginTop : 14, fontSize : 12, fontWeight : '300'}}
                    onPress={minCounter}>
                        We'll send email to confirm your mail. Standard message and data rates apply.
                    </Text>
                </Form>


                <Button 
                block onPress={onButtonSubmit}
                disabled={email && password ? false : true}
                style={{borderRadius : 10}}>
                    <Text style={{fontSize : 16, fontWeight : '500'}}>
                        Register
                    </Text>
                </Button>

                <View style={{marginTop : 20, alignItems : 'center'}}>
                    <Text 
                    onPress={() => navigation.navigate('login')}
                    style={{fontSize : 14}}
                    >
                        Already have an Account ? Login here
                    </Text>
                </View>
            </Content>
        </Container>
    )
}


const mapDispatchToProps = {
    addCounter : addCounter,
    minCounter : minCounter
}


const mapStateToProps = (state) => {
    return{
        bebas : state
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register)

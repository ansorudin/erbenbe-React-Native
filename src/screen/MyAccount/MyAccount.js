import { Button, Container, Content, Text, Thumbnail, View } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onRemoveToken} from './../../redux/actions/userActions'
import { connect } from 'react-redux';



const MyAccount = ({onRemoveToken}) => {

const onBtn = () => {
    AsyncStorage.removeItem('@token')
    .then((data) => {
        console.log(data)
        onRemoveToken()
    })
    .catch((err) => {
      console.log(err)
    })
}



    return (
        <Container>
            <Content style={{borderColor : 'green', borderWidth : 2, padding : 30}}>
                <ScrollView style={{borderWidth : 1}}>
                    <View>
                        <Thumbnail large source={{uri : 'https://cdn.iconscout.com/icon/free/png-256/avatar-368-456320.png'}} />
                        <Text>Hi, I'm Ahmad</Text>
                        <Text>Joined in 2018</Text>
                    </View>
                    <Button onPress={onBtn}>
                        <Text>Hapus data</Text>
                    </Button>
                </ScrollView>
            </Content>
        </Container>
    )
}

const mapDispatchToProps = {
    onRemoveToken
}

const mapStateToProps = (state) => {
    return{
        user : state.user
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)

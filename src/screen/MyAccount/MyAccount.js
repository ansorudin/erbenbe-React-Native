import { Button, Container, Content, Icon, Text, Thumbnail, View, ActionSheet, Root } from 'native-base'
import React, { useState } from 'react'
import { ScrollView, ActionSheetIOS } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onRemoveToken} from './../../redux/actions/userActions'
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Axios from 'axios';
import { apiURL2 } from '../../constant/apiURL';



let defaultPhoto = 'https://www.shareicon.net/data/512x512/2017/02/15/878685_user_512x512.png'
const MyAccount = ({onRemoveToken, user}) => {

const [photo, setPhoto] = useState({
    uri : defaultPhoto ,
    type : '',
    name : ''
})
const [hide, setHide] = useState(false)

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


const openOnsheet = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Open Camera", "From Gallery"],
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                setPhoto({uri : image.path})
                
            })
            .catch((err) => { console.log("openCamera catch" + err.toString()) });
        } else if (buttonIndex === 2) {
            ImagePicker.openPicker({
                compressImageMaxHeight : 100,
                compressImageMaxWidth : 100,
                cropping: true
            }).then(image => {
                setPhoto({uri : image.path, type : image.mime, name : image.filename})
                setHide(true)
            })
            .catch((err) => { console.log("openCamera catch" + err.toString()) });
        }
      }
    );



const onSavePress = () => {
    let fd = new FormData()
    fd.append('image', photo)

    Axios.post(apiURL2 + '/hotels/edit-avatar?id=' + user.token, fd)
    .then((res) => {
        console.log(res)
        setHide(false)
    })
    .catch((err) => {
        console.log(err)
    })
}


    return (
        <Root>
        <View style={{flex : 1, backgroundColor : '#fff'}}>
            <Container style={{paddingHorizontal : 20, marginTop : 100}}>
                <ScrollView >
                    <View >
                        <View style={{flexDirection : 'row', width : '100%', justifyContent : 'space-between', alignItems : 'center'}}>
                            <View>
                                <Text style={{fontSize : 20, fontWeight : '600'}}>Hi, I'm Ahmad</Text>
                                <Text style={{fontWeight : '300', fontSize : 14, marginTop : 8}}>Joined in 2018</Text>
                            </View>
                            <View style={{justifyContent : 'center', alignItems : 'center'}}>
                                <Image 
                                style={{width : 80, height : 80, borderRadius : 90}}
                                source={{uri : photo.uri}} />
                                <View 
                                style={{bottom : -2, right : 2,position : 'absolute',  backgroundColor : 'white', borderRadius : 90, width : 25, height : 25, alignItems : 'center', justifyContent : 'center'}}>
                                    <Icon onPress={openOnsheet} type='EvilIcons' name='plus' 
                                    style={{ color : 'salmon', right : 2}} 
                                    />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={onSavePress} style={{display : hide ? 'flex' : 'none',marginRight : 13,alignSelf : 'flex-end', flexDirection : 'row', alignItems : 'center', marginTop : 8}}>
                            <Image 
                            style={{width : 15, height : 15, marginRight : 5}}
                            source={require('./../../../asset/upload.png')} />
                            <Text style={{fontSize : 12}}>Save</Text>
                        </TouchableOpacity>
                        
                        
                    </View>
                    <View style={{marginTop : 30}}>
                        <Text style={{fontSize : 12, fontWeight : '300'}}>Account settings</Text>
                    </View>
                    <View style={{paddingVertical : 20, borderBottomWidth : 0.5, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                        <Text style={{fontSize : 17, fontWeight : '300'}}>Personal Information</Text>
                        <Image 
                        style={{height : 30, width : 30}}
                        source={require('./../../../asset/profile.png')} />
                    </View>
                    <View style={{paddingVertical : 20, borderBottomWidth : 0.5, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                        <Text style={{fontSize : 17, fontWeight : '300'}}>Payments</Text>
                        <Image 
                        style={{height : 30, width : 30}}
                        source={require('./../../../asset/rupee.png')} />
                    </View>
                    <View style={{marginTop : 40}}>
                        <Text style={{fontSize : 12, fontWeight : '300'}}>Supports</Text>
                    </View>
                    <View style={{paddingVertical : 20, borderBottomWidth : 0.5, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                        <Text style={{fontSize : 17, fontWeight : '300'}}>Get help</Text>
                        <Image 
                        style={{height : 30, width : 30}}
                        source={require('./../../../asset/emergency-call.png')} />
                    </View>
                    <View style={{paddingVertical : 20, borderBottomWidth : 0.5, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                        <Text style={{fontSize : 17, fontWeight : '300'}}>Give us feedback</Text>
                        <Image 
                        style={{height : 30, width : 30}}
                        source={require('./../../../asset/casino-chip.png')} />
                    </View>
                    <View style={{paddingVertical : 20, borderBottomWidth : 0.5, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                        <Text style={{fontSize : 17, fontWeight : '300'}}>Term of Service</Text>
                        <Image 
                        style={{height : 30, width : 30}}
                        source={require('./../../../asset/document.png')} />
                    </View>
                    <View style={{paddingVertical : 40, borderBottomWidth : 0.5, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                        <TouchableOpacity onPress={onBtn}>
                            <Text style={{fontSize : 17, fontWeight : '300', color : 'salmon'}}>Log out</Text>
                        </TouchableOpacity>
                    </View>

                    
                </ScrollView>
            </Container>
        </View>
        </Root>
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


{/* <Button onPress={onBtn}>
    <Text>Hapus data</Text>
</Button>
<Button onPress={onChangeImage}>
    <Text>open Camera</Text>
</Button>
{
    photo &&
    <Image source={{uri : photo.uri}} 
    style={{width : 200, height : 200}}
    />
}
{
    photo &&
    <Button onPress={onSavePress}>
        <Text>save foto</Text>
    </Button>
} */}

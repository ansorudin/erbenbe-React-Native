import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import LottieView from 'lottie-react-native';
import { Icon, } from 'native-base';
import HeaderRButton from '../../../component/HeaderComponent/HeaderRButton';


const PayNow = ({navigation}) => {
    return (
        <View style={{flex : 1, backgroundColor : '#fff'}}>
            <HeaderRButton onPress={() => navigation.navigate('home')} />
        <View style={{marginTop : -30, paddingHorizontal : 30}}>
            <View style={{height : 300, width : 300, alignSelf : 'center'}}> 
                <LottieView  source={require('./../../../../asset/payment.json')} autoPlay loop />
            </View>
            <View style={{marginTop : -30, alignSelf : 'center'}}>
                <Text style={{fontSize : 25, fontWeight : '600'}}>Pay Now</Text>
            </View>
            <View style={{marginTop : 20, paddingVertical : 20}}>
                <View style={{flexDirection : 'row', }}>
                    <Icon type='EvilIcons' name='clock' style={{fontSize : 40}}/>
                    <View style={{marginLeft : 20}}>
                        <Text style={{fontSize : 18, fontWeight : '300'}}>Complete payment before</Text>
                        <Text style={{fontSize : 16, fontWeight : '600', marginVertical : 6}}>03.00 AM</Text>
                        <Text style={{fontSize : 12, fontWeight : '300'}}>Complete your transaction within 1 hour</Text>
                    </View>
                </View>
            </View>

            <View style={{paddingVertical : 20}}>
                <View style={{flexDirection : 'row', }}>
                    <Icon type='EvilIcons' name='credit-card' style={{fontSize : 40}}/>
                    <View style={{marginLeft : 20, width : '100%'}}>
                        <Text style={{fontSize : 18, fontWeight : '300'}}>Transfer to</Text>
                        <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                            <Text style={{fontSize : 14, fontWeight : '300', marginVertical : 6}}>PT. bubuyuq hayuq</Text>
                            <Image 
                            style={{height : 15, width : 50, resizeMode : 'contain', marginRight : 50,marginTop : -10}}
                            source={require('./../../../../asset/mandiri.png')} />
                        </View>
                        <Text style={{fontSize : 16, fontWeight : '600'}}>165 00 66 77 0000</Text>

                        <Text style={{fontSize : 14, fontWeight : '300', marginTop : 20, marginVertical : 6}}>Amount</Text>
                        <Text style={{fontSize : 16, fontWeight : '600'}}>Rp. 989.<Text style={{color : 'salmon'}}>234</Text></Text>
                        <Text style={{fontSize : 12, fontWeight : '300', marginTop : 6}}>Please ttransfer the uniq number on last digit amount</Text>
                    </View>
                </View>
            </View>
        
            <View style={{marginTop : 20}}>
                <Text style={{fontSize : 18, fontWeight : '300'}}>
                    Completed transaction ?
                </Text>
                <Text style={{fontWeight : '300', fontSize : 12, marginTop : 10}}>
                    Once your payment is confirmed, we will send your receipt and hotel voucher to your email address
                </Text>
                <TouchableOpacity style={{alignSelf : 'center', backgroundColor : 'salmon', paddingHorizontal : 60, paddingVertical : 10, borderRadius : 10, marginTop : 30}}>
                    <Text style={{color : '#fff', fontWeight : '300'}}>Confirmed Payment</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    )
}

export default PayNow

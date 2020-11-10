import { Icon } from 'native-base'
import React from 'react'
import { Text, View } from 'react-native'

const DetailFeesAndTax = ({price, totalDay}) => {
    return(
        <View>
            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                <Text style={{fontSize : 12, marginRight : 5, fontWeight : '600'}}>Fees & Tax Details</Text>
                <Icon type='EvilIcons' name='exclamation' style={{fontSize : 18}}/>
            </View>
            <View style={{marginTop : 20, flexDirection : 'row', justifyContent : 'space-between'}}>
                <View>
                    <Text style={{fontSize : 18, fontWeight : '300'}}>
                        ${price} x {totalDay} night
                    </Text>
                    <Text style={{fontSize : 18, fontWeight : '300', marginVertical : 20}}>
                        Tax
                    </Text>
                    <Text style={{fontSize : 18, fontWeight : '300'}}>
                        Service fee
                    </Text>
                </View>
                <View style={{alignItems : 'flex-end'}}>
                    <Text style={{fontSize : 18, fontWeight : '300'}}>
                        ${price * totalDay}
                    </Text>
                    <Text style={{fontSize : 18, fontWeight : '300', marginVertical : 20}}>
                        $10
                    </Text>
                    <Text style={{fontSize : 18, fontWeight : '300'}}>
                        $15
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default DetailFeesAndTax

import { Icon } from "native-base";
import React, { useRef, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Animated
} from "react-native";

const SelectPayment = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(true);

//   console.log(opa)
  return (
        <View style={{flex : 1, backgroundColor : '#fff'}}>
        <View style={{backgroundColor : 'white', marginTop : 80, flex : 1}}>
            <View style={{position : 'absolute', left : 15, top : 15}}>
                <Icon onPress={() => {navigation.goBack(null), setModalVisible(false)}} type='EvilIcons' name='close' style={{fontSize : 25}}/>
            </View>
            <View style={{marginTop : 70, paddingHorizontal : 20}}>
                <View>
                    <Text style={{fontSize : 30}}>Pay with</Text>
                    <Text style={{fontWeight : '300', marginTop : 5}}>Payment currency : IDR</Text>
                </View>
                <View style={{marginTop : 30}}>
                    <View style={{ paddingVertical : 20, borderBottomWidth : 0.5, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <Icon type='EvilIcons' name='credit-card' style={{fontSize : 50, marginRight : 10}}/>
                            <Text style={{fontWeight : '300', fontSize : 16}}>
                                Bank Transfer
                            </Text>
                        </View>
                        <Icon type='EvilIcons' name='chevron-right' />
                    </View>
                    <View style={{ paddingVertical : 20, borderBottomWidth : 0.5, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <Icon type='EvilIcons' name='credit-card' style={{fontSize : 50, marginRight : 10}}/>
                            <Text style={{fontWeight : '300', fontSize : 16}}>
                                OVO, GOPAY, DANA
                            </Text>
                        </View>
                        <Icon type='EvilIcons' name='chevron-right' />
                    </View>
                    <View style={{ paddingVertical : 20, borderBottomWidth : 0.5, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <Icon type='EvilIcons' name='credit-card' style={{fontSize : 50, marginRight : 10}}/>
                            <Text style={{fontWeight : '300', fontSize : 16}}>
                                Credit or debit card
                            </Text>
                        </View>
                        <Icon type='EvilIcons' name='chevron-right' />
                    </View>
                </View>
            </View>
        </View>
        </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    height : '100%'
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default SelectPayment;

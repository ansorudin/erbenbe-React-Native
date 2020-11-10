import { Icon } from 'native-base'
import React from 'react'
import { Dimensions, TouchableOpacity, View, StyleSheet } from 'react-native'


const windowWidth = Dimensions.get('window').width;

const HeaderRLButton = ({backgroundHeader, onPress}) => {
    return (
        <View style={[styles.HeaderContainer, {backgroundColor : backgroundHeader}]}>
            <View style={styles.HeaderInnerContainer}>
                <TouchableOpacity onPress={onPress} style={styles.buttonClose}>
                    <Icon type='MaterialIcons' name='close' style={{ fontSize : 20, color : 'black'}} />
                </TouchableOpacity>

                <View style={{ flexDirection : 'row' }}>
                    <TouchableOpacity style={styles.buttonRight}>
                        <Icon type='EvilIcons' name='share-apple' style={{ fontSize : 25, color : 'black'}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonRight,{ marginLeft : 6}]}>
                        <Icon type='EvilIcons' name='heart' style={{ fontSize : 25, color : 'black'}} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    HeaderContainer : {
        width : windowWidth,  
        height : 100, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 0 }, 
        shadowOpacity: 0.5, 
        shadowRadius: 2 
    },
    HeaderInnerContainer :{
        flexDirection : 'row', 
        justifyContent : 'space-between', 
        width : '100%', 
        paddingHorizontal : 20, 
        marginTop : 50
    },
    buttonClose : {
        height: 30, 
        width : 30, 
        backgroundColor : 'white', 
        borderRadius : 90, 
        padding : 5
    },
    buttonRight : {
        alignItems : 'center', 
        justifyContent : 'center', 
        height: 30, 
        width : 30, 
        backgroundColor : 'white', 
        borderRadius : 90}
})

export default HeaderRLButton

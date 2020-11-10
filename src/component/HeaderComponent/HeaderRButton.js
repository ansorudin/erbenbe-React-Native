import { Icon } from 'native-base'
import React from 'react'
import { Dimensions, TouchableOpacity, View, StyleSheet } from 'react-native'


const windowWidth = Dimensions.get('window').width;

const HeaderRButton = ({backgroundHeader, onPress}) => {
    return (
        <View style={[styles.HeaderContainer, {backgroundColor : backgroundHeader}]}>
            <View style={styles.HeaderInnerContainer}>
                <TouchableOpacity onPress={onPress} style={styles.buttonClose}>
                    <Icon type='MaterialIcons' name='chevron-left' style={{ fontSize : 20, color : 'black'}} />
                </TouchableOpacity>
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
        shadowRadius: 1 
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
        backgroundColor : '#fff', 
        borderRadius : 90, 
        padding : 5
    }
})

export default HeaderRButton

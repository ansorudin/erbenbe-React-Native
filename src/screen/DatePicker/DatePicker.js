import React, { useEffect, useRef, useState } from 'react';
import {StatusBar,ImageBackground , Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  Value,
} from 'react-native-reanimated'
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import {onChangeDateHotelFilter, onChangeEndDateHotelFilter} from '../../redux/actions/hotelsActions'
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function DatePicker({navigation,hotels, onChangeDateHotelFilter, route, onChangeEndDateHotelFilter}) {
  const animatedPosition = React.useRef(new Value(0))
  const [pasDiScroll, setPasDiScroll] = useState(false)
  
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  

  const selectDate =(day)=> {
    let selectedDate = day.dateString;

    if(startDate === '' && endDate === ''){
      setStartDate(selectedDate)
      onChangeDateHotelFilter(selectedDate)
    }else if(Number(selectedDate.split('-').join('')) < Number(startDate.split('-').join(''))){
      setStartDate(selectedDate)
      setEndDate('')
      onChangeDateHotelFilter(selectedDate)
      onChangeEndDateHotelFilter('')
    }else if(startDate !== '' && endDate === ''){
      setEndDate(selectedDate)
      onChangeEndDateHotelFilter(selectedDate)
    }
    else if(startDate !== '' && endDate !== ''){
      setStartDate(selectedDate)
      setEndDate('')
      onChangeDateHotelFilter(selectedDate)
      onChangeEndDateHotelFilter('')
    }
  }

  const opacity = interpolate(animatedPosition.current, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  
  return (
    <View style={{flex : 1}}>
    <View style={[styles.container]}>
      <View style={{height : 120, paddingHorizontal : 20, marginTop : 80, width : windowWidth /1.8}}>
        <Animated.Text style={{opacity : opacity, fontSize : 30, fontWeight : '600'}}>
            When will you be there?
        </Animated.Text>
        
        
      </View>
        <View style={{paddingHorizontal : 30,backgroundColor : 'white', borderTopWidth : 0.5, borderTopColor : 'gray' , height : 110, zIndex : 10, position : 'absolute', bottom : 0, width : windowWidth}}>
            <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', height : '100%'}}>
                <Text 
                onPress={() => {onChangeDateHotelFilter(''), onChangeEndDateHotelFilter(''), setEndDate(''), setStartDate('')}}
                style={{fontSize : 18, textDecorationLine :'underline'}}>Clear
                </Text>
                <TouchableOpacity 
                    style={[hotels.filterDate && hotels.filterEndDate ? {backgroundColor : '#000',paddingHorizontal : 35, paddingVertical : 10, borderRadius : 10} : {backgroundColor : 'gray',paddingHorizontal : 35, paddingVertical : 10, borderRadius : 10} ]}
                    disabled={hotels.filterDate && hotels.filterEndDate ? false : true}
                    onPress={() => navigation.navigate('hotellist', {location : route.params.location, startDate : hotels.filterDate, endDate : hotels.filterEndDate})}
                >
                    <Text style={{fontSize : 18, color : '#fff'}}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>

      <ScrollBottomSheet // If you are using TS, that'll infer the renderItem `item` type
        componentType="FlatList"
        snapPoints={[35, windowHeight - 700]}
        animatedPosition={animatedPosition.current}
        initialSnapIndex={1}
        onSettle={(snapIndex) => {
          if(snapIndex === 0){
            setPasDiScroll(true)
          }else{
            setPasDiScroll(false)
          }
        }}
        renderHandle={() => (
          <View style={styles.header}>
            <View style={styles.panelHandle} />

            <View style={{justifyContent : 'center',borderBottomWidth : 0.3, width : windowWidth / 1.15, paddingVertical : 20}}>
                <View style={{width : '100%'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('home')} >
                        <Icon type='MaterialIcons' name='chevron-left' style={{ fontSize : 20, color : 'black'}} />
                    </TouchableOpacity>
                    <View style={{alignItems : 'center', justifyContent : 'center', width : '100%', marginTop : -10}}>
                        {
                            pasDiScroll ?
                            <View style={{alignItems : 'center', justifyContent : 'center', position : 'absolute'}}>
                                <Text style={{fontWeight : '600'}}>When will you be there</Text>
                            </View>

                            :
                            <View style={{alignItems : 'center', justifyContent : 'center', position : 'absolute'}}>
                                <Text style={{fontWeight : '600'}}>{route.params.location}</Text>
                            </View>
                        }
                    </View>
                    <Text 
                      style={{alignSelf : 'center', marginTop : 13, fontSize : 12}}>

                      {
                      !endDate && startDate && moment(startDate).format("DD MMM") || 
                      startDate && endDate && moment(startDate).format("DD") + ' - ' + moment(endDate).format("DD MMM") 
                      }

                    </Text>


                </View>
                <View style={{marginTop : 30,flexDirection : 'row', width : '100%', justifyContent : 'space-between', paddingHorizontal : 20}}>
                    <Text style={{fontWeight : '300'}}>S</Text>
                    <Text style={{fontWeight : '300'}}>M</Text>
                    <Text style={{fontWeight : '300'}}>T</Text>
                    <Text style={{fontWeight : '300'}}>W</Text>
                    <Text style={{fontWeight : '300'}}>T</Text>
                    <Text style={{fontWeight : '300'}}>F</Text>
                    <Text style={{fontWeight : '300'}}>S</Text>
                </View>
            </View>
            <CalendarList 
            scrollEnabled={pasDiScroll}
            current={hotels.filterDate}
            pastScrollRange={0}
            onDayPress={(day) => selectDate(day)}
            hideExtraDays={true}
            hideDayNames={true}
            minDate={new Date()}
            maxDate={new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() + 30)}
            markedDates={{
              [startDate]: {selected: true, marked: true, selectedColor: '#000'},
              [endDate]: {selected: true, selectedColor: '#000'},
             
            }}
            
              theme={{
                textMonthFontWeight: 'bold',
              }}
            />
          </View>
        )}
        
        
        contentContainerStyle={styles.contentContainerStyle}
      />
      
    </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width : windowWidth,
    height : windowHeight,
    backgroundColor : 'salmon'
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: 'white',
    zIndex : -1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 0.6, 
    shadowRadius: 1 

  },
  panelHandle: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSearchBar : {
    padding : 10, 
    backgroundColor : 'white', 
    zIndex : 10,
    justifyContent: 'flex-end', 
    borderBottomColor : 'gray',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 0 }, 
    shadowRadius: 1 
  }
});


const mapStateToProps = (state) => {
  return {
      hotels : state.hotels,
      option : state.option
  }
}

const mapDispatchToProps ={
  onChangeDateHotelFilter, onChangeEndDateHotelFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker
    )
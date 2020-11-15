import React, { useEffect, useRef, useState } from 'react';
import {StatusBar,ImageBackground , Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import Animated, {
  concat,
  Easing,
  Extrapolate,
  interpolate,
  Value,
} from 'react-native-reanimated'
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import CardComponent from '../../component/CardComponent/CardComponent'
import {getAllHotels, sortHotelByPriceAsc} from '../../redux/actions/hotelsActions'
import {onTrue, onFalse} from '../../redux/actions/optionsActions'
import moment from 'moment'
import LottieView from 'lottie-react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let loc = {
  "bounds": {
      "northeast": {
          "lat": -6.839277999999999,
          "lng": 107.7387141
      },
      "southwest": {
          "lat": -6.9676209,
          "lng": 107.547601
      }
  },
  "location": {
      "lat": -6.9174639,
      "lng": 107.6191228
  }
}

function HotelList({hotels, getAllHotels, sortHotelByPriceAsc, navigation,route, onFalse, onTrue}) {
  const animatedPosition = React.useRef(new Value(0))
  const [enabledScroll, setEnabledScroll] = useState(false)
  

  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;

  const lat = parseFloat(loc.location.lat);
  const lng = parseFloat(loc.location.lng);
  const northeastLat = parseFloat(loc.bounds.northeast.lat);
  const southwestLat = parseFloat(loc.bounds.southwest.lat);
  const latDelta = northeastLat - southwestLat;
  const lngDelta = latDelta * ASPECT_RATIO;

  useEffect(() => {
    let location = route.params.location
    let startDate = hotels.filterDate
    let endDate = hotels.filterEndDate
    getAllHotels(location, startDate, endDate)
  }, [])
  

  const textKosong =()=>(
    <View style={[{height : 200,width : windowWidth /1.2, justifyContent : 'flex-start', alignItems : 'flex-start', marginLeft : 5}]}>
      {
        hotels.loading && hotels.data === null ? 
          <LottieView  source={require('./../../../asset/threeDotsLoader.json')} autoPlay loop />
        :
          <View>
            <Text style={{fontSize : 20, fontWeight : '600'}}>No result</Text>
            <Text style={{fontSize : 13, fontWeight : '300', marginTop : 5}}>We couldn't find anything matching your seacrh. Try searching other keyword.</Text>
          </View>

      }
    </View>
  )

  const margin = interpolate(animatedPosition.current, {
    inputRange: [0, 0.5, 1],
    outputRange: [25 , 25, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const radius = interpolate(animatedPosition.current, {
    inputRange: [0, 0.5, 1],
    outputRange: [20, 20,  0],
    extrapolate: Extrapolate.CLAMP,
  });
  const borderBtm = interpolate(animatedPosition.current, {
    inputRange: [0, 1],
    outputRange: [0, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });
  const clr = interpolate(animatedPosition.current, {
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolate(animatedPosition.current, {
    inputRange: [0, 1],
    outputRange: [0.5, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  

  return (
    <View style={{flex : 1}}>
    <MapView
      scrollEnabled={enabledScroll}
      // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={[styles.map]}
      onTouchStart={() => console.warn('akakak')}
      region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
    }}
    >
    </MapView>
      <Animated.View style={{ zIndex : 1, height : 120, justifyContent : 'flex-end'}}>
        <Animated.View 
        style={[styles.containerSearchBar,{shadowOpacity: opacity ,  flexGrow : clr, borderBottomWidth : borderBtm , borderRadius: radius, marginHorizontal : margin}]}>
          <View style={{flexDirection : 'row', marginHorizontal : 5, paddingVertical : 5}}>

            <View style={{flexDirection : 'row', alignItems : 'center', flex : 1.5, }}>
              <Icon onPress={() => {navigation.navigate('home'), onTrue()}} type='MaterialIcons' name='navigate-before' style={{fontSize : 25}}/>
              <Text style={{fontSize : 16, marginLeft : 10, fontWeight : '600'}}>{route.params.location}</Text>
            </View>

            <View style={{flexDirection : 'row', alignItems : 'center',flex : 2, justifyContent : 'center'}}>
              <Text style={{fontSize : 14, color : 'gray'}}>{moment(route.params.startDate).format("MMM DD") + ' - ' + moment(route.params.endDate).format("DD")}</Text>
              <Icon type='MaterialIcons' name='fiber-manual-record' style={{fontSize : 8, marginHorizontal : 5, color : 'gray'}} />
              <Text style={{fontSize : 14, marginRight : 20, color : 'gray'}}>1 guest</Text>
            </View>

            <View style={{justifyContent : 'center',  borderLeftWidth : 1, flex : 0.6, borderLeftColor : 'gray'}}>
              <Icon type='MaterialIcons' name='tune' style={{fontSize : 20, marginLeft : 10}}/>
            </View>
            
          </View>
        </Animated.View>
      </Animated.View>
      <ScrollBottomSheet // If you are using TS, that'll infer the renderItem `item` type
        componentType="FlatList"
        snapPoints={[20, windowHeight - 400, windowHeight - 80]}
        animatedPosition={animatedPosition.current}
        initialSnapIndex={1}
        onSettle={(snapIndex) => {
          if(snapIndex === 2){
            onFalse()
          }else{
            onTrue()
          }
        }}
      
        
        renderHandle={() => (
          <View style={styles.header}>
            <View style={styles.panelHandle} />

            <View style={{justifyContent : 'center',borderBottomWidth : 0.3, width : windowWidth / 1.15, height : 58, alignItems : 'center'}}>
                <Text onPress={() => navigation.setOptions({tabBarVisible : false}) } style={{fontWeight : '600', fontSize : 17, marginHorizontal : 10}}>
                    300+ places to stay
                </Text>
            </View>
          </View>
        )}
        
        data={hotels.data}
        ListEmptyComponent={textKosong}
        renderItem={({ item, index }) => {
          // console.log(item)
          if(item !== null){
            return(
              <View style={styles.item}>
                <CardComponent 
                onPress={() => navigation.navigate('hoteldetail', {id : item.id, startDate : route.params.startDate, endDate : route.params.endDate})} 
                name={item.name} 
                lokasi={item.address} 
                harga={item.price} 
                image={item.url}/>
              </View>
            )
          }
          }}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width : windowWidth,
    height : windowHeight
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
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


const mapStateToProps = (state) => {
  return {
      hotels : state.hotels,
      option : state.option
  }
}

const mapDispatchToProps ={
  getAllHotels, sortHotelByPriceAsc, onTrue, onFalse
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelList)
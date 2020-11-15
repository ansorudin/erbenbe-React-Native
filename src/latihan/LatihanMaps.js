import React, { useEffect } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { getPredictionList } from './LatihanFetchMaps';


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



const LatihanMaps = () => {
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;

    const lat = parseFloat(loc.location.lat);
    const lng = parseFloat(loc.location.lng);
    const northeastLat = parseFloat(loc.bounds.northeast.lat);
    const southwestLat = parseFloat(loc.bounds.southwest.lat);
    const latDelta = northeastLat - southwestLat;
    const lngDelta = latDelta * ASPECT_RATIO;

    

    return (
        
        <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta,
        }}
        >
        </MapView>
    )
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});

export default LatihanMaps

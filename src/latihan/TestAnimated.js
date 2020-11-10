// import React, { useState } from 'react'
// import { View, Animated, TouchableOpacity, Text} from 'react-native'


// const TestAnimated = () => {

//     const value = useState(new Animated.ValueXY({x : 0, y : 0}))[0]

//     function moveBall (){
//         Animated.timing(value, {
//             toValue : {x : 200, y : 100},
//             duration : 1000,
//             useNativeDriver : true
//         }).start()
//     }
//     return (
//         <View>
//             <Animated.View style={value.getLayout()}>
//                 <View style={{
//                     width : 100,
//                     height : 100,
//                     borderRadius : 100 /2,
//                     backgroundColor : 'red'
//                 }} />

                
//             </Animated.View>
//             <TouchableOpacity onPress={moveBall}>
//                 <Text>Move</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default TestAnimated

// import React from "react";
// import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

// const TestAnimated = () => (
//   <SafeAreaView style={styles.container}>
//     <ScrollView
//       contentContainerStyle={styles.scrollContentContainer}
//     >
//       <View style={styles.box}>
//         <Text style={styles.text}>Original Object</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ scale: 2 }]
//       }]}>
//         <Text style={styles.text}>Scale by 2</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ scaleX: 2 }]
//       }]}>
//         <Text style={styles.text}>ScaleX by 2</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ scaleY: 2 }]
//       }]}>
//         <Text style={styles.text}>ScaleY by 2</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ rotate: "45deg" }]
//       }]}>
//         <Text style={styles.text}>Rotate by 45 deg</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [
//           { rotateX: "45deg" },
//           { rotateZ: "45deg" }
//         ]
//       }]}>
//         <Text style={styles.text}>Rotate X&Z by 45 deg</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [
//           { rotateY: "45deg" },
//           { rotateZ: "45deg" }
//         ]
//       }]}>
//         <Text style={styles.text}>Rotate Y&Z by 45 deg</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ skewX: "45deg" }]
//       }]}>
//         <Text style={styles.text}>SkewX by 45 deg</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ skewY: "45deg" }]
//       }]}>
//         <Text style={styles.text}>SkewY by 45 deg</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [
//           { skewX: "30deg" },
//           { skewY: "30deg" }
//         ]
//       }]}>
//         <Text style={styles.text}>Skew X&Y by 30 deg</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ translateX: -50 }]
//       }]}>
//         <Text style={styles.text}>TranslateX by -50 </Text>
//       </View>

//       <View style={[styles.box, {transform: [{ translateY: 50 }]}]}>
//         <Text style={styles.text}>TranslateY by 50 </Text>
//       </View>
//     </ScrollView>
//   </SafeAreaView>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   scrollContentContainer: {
//     alignItems: "center",
//     paddingBottom: 60
//   },
//   box: {
//     height: 100,
//     width: 100,
//     borderRadius: 5,
//     marginVertical: 40,
//     backgroundColor: "#61dafb",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   text: {
//     fontSize: 14,
//     fontWeight: "bold",
//     margin: 8,
//     color: "#000",
//     textAlign: "center"
//   }
// });

// export default TestAnimated;

import React, { useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const TestAnimated = () => {

    useEffect(() => {
        console.log(scrollOffset)
    })

    const [isScrollEnabled, setIsScrollEnabled] = useState(false)
    const [scrollOffset, setScrollOffset] = useState(0)

  const pan = useRef(new Animated.ValueXY({x:0, y : SCREEN_HEIGHT - 120})).current;
  
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true ,

      onPanResponderGrant: () => {
        pan.setOffset({
            x: pan.x._value,
            y: pan.y._value
          });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {dy: pan.y }
          
        ],
        {useNativeDriver : false},
      ),
      onPanResponderRelease: (evt,gestureState) => {
        pan.flattenOffset();
        if(gestureState.dy < 0){
            // setIsScrollEnabled(true)
            // pan.flattenOffset();
            Animated.spring(pan, {
                // toValue : -SCREEN_HEIGHT + 120,
                toValue : {x : 0, y : SCREEN_HEIGHT / 3},
                tension : 1,
                useNativeDriver:true //Add this line
            }).start()
        }else if(gestureState.dy > 0){
            // setIsScrollEnabled(false)
            // pan.flattenOffset();
            Animated.spring(pan,{
                // toValue : SCREEN_HEIGHT - 120,
                toValue : {x : 0, y : SCREEN_HEIGHT - 120 },
                tension : 1,
                useNativeDriver : true
            }).start()
        }
      }
    })
  ).current;

  return (
    <View style={[styles.container, {backgroundColor : 'salmon'}]}>
      <Animated.View
        style={{
          transform: [{ translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
          <ScrollView
            bounces={false}
            scrollEnabled={isScrollEnabled}
            scrollEventThrottle={16}
            onScroll={event => {
                setScrollOffset(event.nativeEvent.contentOffset.y)
            }}
          >
            <View style={[styles.box, {height : 100000}]}>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
                <Text>aku</Text>
            </View>

          </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  }
});

export default TestAnimated;
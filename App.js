/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * npx react-native run-windows
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

//var x2 = 100

//function App (){
const App: () => React$Node = () => {
  const [msg, updateMsg] = useState('hello user');
  const [w,updateX] = useState(0)

  function printXY(evt) {
    let xy = String(Math.round(evt.nativeEvent.locationX)) + ' ' + String(Math.round(evt.nativeEvent.locationY));
    //let s = String(w) + ' ' + String(h)
    updateMsg(xy);
    updateX(Math.round(evt.nativeEvent.locationX))
  }

   function bboxStyle() {
    return {
          width: 100,
          height: 100,
          position: 'absolute',
          top: 0,
          left: w,
          borderWidth: 2,
          borderColor: Colors.black,
           }
  }

  return (
    <View style={styles.overall_screen}>
      <Image style={styles.face_cam} source={require('./assets/1.jpg')} />
      <Image
        style={styles.food_cam}
        source={require('./assets/2.jpg')}
        onTouchStart={evt => printXY(evt)}
      > 
      </Image> 

      <View style={styles.text_prompt}>
        <Text style={{ fontSize: 20 }}>{msg}</Text>
      </View>
      <View style = {bboxStyle()} >

      </View>
    </View>
  );
};

//style= {{position: 'absolute', left: 0, top: 0, width: 100, height:100, borderWidth:5, borderColor: Colors.black}}

const styles = StyleSheet.create({

  bbox: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    borderWidth: 5,
    borderColor: Colors.black,
  },
  face_cam: {
    width: 640,
    height: 480,
    position: 'absolute',
    top: h * 0.15, //140
    left: w * 0.06, //100
    borderRadius: 5,
  },
  food_cam: {
    width: 640,
    height: 480,
    position: 'absolute',
    top: h * 0.15, //140
    left: w * .51, //800
    borderRadius: 5,
  },

  overall_screen: {
    width: w,
    height: h,
    backgroundColor: Colors.white,
    position: 'relative',
  },

  text_prompt: {
    width: 500,
    height: 40,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: h * .8, // 650
    left: w * .35, // 500
    borderRadius: 5,
  },

  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.black,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

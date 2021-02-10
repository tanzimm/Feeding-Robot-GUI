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
  Button,
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
const food_cam_pos = [(w * .51),(h * 0.15)];
const face_cam_pos = [(w * 0.06),(h * 0.15)];

var x = 0 
var y = 0
var prev_x = 0
var prev_y = 0



const App: () => React$Node = () => {
  const [msg, updateMsg] = useState('hello user');
  const [bb, updateBbox] = useState([0, 0, 0, 0])
  const [draw, updateDraw] = useState(false)
  const [bbox_btn_color, updateColor1] = useState("#00cc00")
  const [bbox_color, updateColor2] = useState(Colors.black)
  const [adj_color,updateColor3] = useState(Colors.black)

  function getXY(evt) {
    if (draw == true) {
      updateColor2("#00cc00")
      x =  Math.round(evt.nativeEvent.locationX)
      y =  Math.round(evt.nativeEvent.locationY)   
      prev_x = x
      prev_y = y   
    }

    else {
      let xy = String(Math.round(evt.nativeEvent.locationX)) + ' ' + String(Math.round(evt.nativeEvent.locationY))
      updateMsg(xy)
    }
  }
  function draw_bbox(evt){
    if (draw == true){
  
      let x2 = Math.round(evt.nativeEvent.locationX)
      let y2 = Math.round(evt.nativeEvent.locationY)



      let roc_x = x2 - prev_x
      let roc_y = y2 - prev_y 


      let xy = String(roc_x) + " " + String(roc_y)

      prev_x = x2
      prev_y = y2

   
      let bb_w = (x2 - (x))
      let bb_h = (y2  - (y))
      //let xy = String(x2) + " " + String(y2) + " " + String(bb_w) + " " + String(bb_h)  
     
      updateBbox([bb_w,bb_h,x+food_cam_pos[0],y+food_cam_pos[1]])
      updateColor3("#ff3300")

          
      
      
      
      
      updateMsg(xy)
    }

  }

  function enable_Bbox() {
    //turning draw button on
    if (draw == false) {
      updateColor1("#ff3300")
      updateDraw(true)
      
    }
    //turning draw button off
    else {
      updateColor1("#00cc00")
      updateDraw(false)
      updateBbox([0,0,0,0])
      updateColor2(Colors.black)
      updateColor3(Colors.black)
    }


  }
  

  function bboxStyle() {
    return {
      position: 'absolute',
      width: bb[0],
      height: bb[1],
      left: bb[2], //(w * .51) + bb[2],
      top: bb[3],//(h * 0.15) + bb[3],
      borderWidth: 3,
      borderColor: bbox_color,//"#00cc00",
    }
  }

  function bboxBtn_style() {
    return {
      width: 50,
      height: 50,
      position: 'absolute',
      top: food_cam_pos[1] - 55,
      left: food_cam_pos[0],
      borderRadius: 50,
      justifyContent: 'center',
      backgroundColor: bbox_btn_color,
      justifyContent: 'center',
      alignItems: 'center',
    }
  }

  function adjust_point_style(p1,p2){
    return{
      position:'absolute',
      left: p1, //(-6,-10), (100,-10), (-4,100), (100,100)
      top: p2,
      width: 15,
      height: 15,
      borderRadius: 15,
      backgroundColor: adj_color,

    }
  }

  function test(evt){
    
    let x2 = Math.round(evt.nativeEvent.locationX)
    let y2 = Math.round(evt.nativeEvent.locationY)
    let xy = String(x2) + " " + String(y)
    updateMsg(xy)

    
  }

  return (
    <View style={styles.overall_screen}>
      <Image style={styles.face_cam} source={require('./assets/1.jpg')} />
      <Image
        style={styles.food_cam}
        source={require('./assets/2.jpg')}
        onTouchStart={evt => getXY(evt)}
        onTouchMove = {evt => draw_bbox(evt)}
        onTouchEnd = {evt => draw_bbox(evt)}
         />

      <View style={styles.text_prompt}>
        <Text style={{ fontSize: 20 }}>{msg}</Text>
      </View>
      <View style={bboxStyle()} >
        <View style = {adjust_point_style(-15,-12)}/>
        <View style = {adjust_point_style("100%",-12)}/>
        <View style = {adjust_point_style(-10,"100%")}/>
        <View style = {adjust_point_style("100%","100%")}/>
      </View>
      <View style={bboxBtn_style()} onTouchStart={evt => enable_Bbox()} >
        <Text style={{ fontSize: 30, fontWeight: 'bold' }} >+</Text>

      </View>

    </View>
  );
};

//style= {{position: 'absolute', left: 0, top: 0, width: 100, height:100, borderWidth:5, borderColor: Colors.black}}

const styles = StyleSheet.create({

  adjust_point: {
    position:'absolute',
    left: '-4%', //(-6,-10), (100,-10), (-4,100), (100,100)
    top: '100%',
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#ff3300",

  },

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
    top: face_cam_pos[1], //140
    left: face_cam_pos[0], //100
    borderRadius: 5,
  },
  food_cam: {
    width: 640,
    height: 480,
    position: 'absolute',
    top:food_cam_pos[1], //140
    left: food_cam_pos[0], //800
    borderRadius: 5,
  },

  overall_screen: {
    width: w,
    height: h,
    backgroundColor: Colors.black,
    position: 'relative',
  },

  bbox_btn: {


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

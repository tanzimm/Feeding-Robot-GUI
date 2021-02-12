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


var bbox_x = 0 
var bbox_y = 0
var bbox_w = 0
var bbox_h = 0
var aqc_mode = -1


const App: () => React$Node = () => {
  const [msg, updateMsg] = useState('hello user');
  const [bb, updateBbox] = useState([0, 0, 0, 0])
  const [draw, updateDraw] = useState(false)
  const [bbox_btn_color, updateColor1] = useState("#00cc00")
  const [bbox_color, updateColor2] = useState(Colors.black)
  const [adj_color,updateColor3] = useState(Colors.black)
  
  const [pick_acq,updatePick] = useState(false)
  const [ask_q,updateQ] = useState(false)
  const [ask_done,updateDone] = useState(false)
 

  function getXY(evt) {
    if (draw == true) {
      updateColor2("#00cc00")
      bbox_x =  Math.round(evt.nativeEvent.locationX)
      bbox_y =  Math.round(evt.nativeEvent.locationY)   
    }

    else if ( draw == false && pick_acq == false) {
      let xy = String(Math.round(evt.nativeEvent.locationX)) + ' ' + String(Math.round(evt.nativeEvent.locationY))
      updateMsg(xy)
     // ask_question("is it correct?",1)
     
    }
  }
  function draw_bbox(evt){
    
    if (draw == true){
      let x2 = Math.round(evt.nativeEvent.locationX)
      let y2 = Math.round(evt.nativeEvent.locationY)

      if ((x2 <= 15) && (y2 <= 15))
      {
        return
      }

      x2 = Math.max(0,x2)
      y2 = Math.max(0,y2)

      x2 = Math.min(640,x2)
      y2 = Math.min(480,y2)

      bbox_w = (x2 - (bbox_x))
      bbox_h = (y2  - (bbox_y))
      let xy = String(bbox_x) + " " + String(bbox_y) + " " + String(bbox_x+bbox_w) + " " + String(bbox_y+bbox_h) 
     
      updateBbox([bbox_w,bbox_h,bbox_x+food_cam_pos[0],bbox_y+food_cam_pos[1]])
      updateColor3("#ff3300")  
      updateMsg(xy)
    }
  }

  function enable_Bbox() {
    //turning draw button on
    if (pick_acq == true){
      return
    }

    if (draw == false) {
      updateColor1("#ff3300")
      updateDraw(true)
      
    }
    //turning draw button off
    else {
      updateColor1("#00cc00")
      updateDraw(false)
      hide_bbox()
    }

  }
  function hide_bbox(){
    updateBbox([0,0,0,0])
    updateColor2(Colors.black)
    updateColor3(Colors.black)
  }

  function add_bbox(){

    if (draw == true){

      if( bbox_w == 0 || bbox_h == 0){

        updateMsg("no bounding box created")
        return
      }

      let bbox = String(bbox_x) + "," + String(bbox_y) + "," + String(bbox_w) + "," + String(bbox_h)
      updateDraw(false)
      //updateMsg("How should I feel you this food?")
      updateMsg(bbox)
      updatePick(true)
    }

  }

  function choose_acq_mode(mode){
    
      if (pick_acq == true){
        aqc_mode = mode
        updateMsg(aqc_mode)
        updatePick(false)
        updateColor1("#00cc00")
        hide_bbox()
        
        bbox_x = 0 
        bbox_y = 0
        bbox_w = 0
        bbox_h = 0
        aqc_mode = -1
      }
  }

  function ask_question(q,selection){
    
    if (selection == 0){
      updateMsg(q)
      updateQ(true)
    }

    else if (selection == 1){
      updateMsg("Are you done")
      updateDone(true)
    }
       
  }

  function choose_yn(answer){
    if (ask_q == true) {
      updateMsg(answer)
      updateQ(false)

    }
  }

  function choose_done(){
    if (ask_done == true){
      updateMsg("done")
      updateDone(false)
     
    }
  }

  function adjust_point(evt,p){

    let x2 = Math.round(evt.nativeEvent.locationX)
    let y2 = Math.round(evt.nativeEvent.locationY)

    // if ((x2 <= 15) && (y2 <= 15))
    // {
    //     return
    // }

    x2 = Math.max(0,x2)
    y2 = Math.max(0,y2)

    x2 = Math.min(640,x2)
    y2 = Math.min(480,y2)
  
    if (p == 1){
      bbox_w = (bbox_x + bbox_w) - x2
      bbox_h = (bbox_y + bbox_h) - y2
      bbox_x = x2
      bbox_y = y2
      //let xy = String(x2) + " " + String(y2) + " " + String(bb_w) + " " + String(bb_h) 
    }
    else if (p == 2){
      bbox_w = x2 - (bbox_x) 
      bbox_h = (bbox_y + bbox_h) - y2
      bbox_x = x2 - bbox_w
      bbox_y = y2
    }
    else if( p == 3){
      bbox_w = (bbox_x+bbox_w) - x2
      bbox_h = y2 - bbox_y
      bbox_x = x2
      bbox_y = y2 - bbox_h
    }
    else if( p == 4){
      bbox_w = x2 - bbox_x
      bbox_h = y2 - bbox_y
      bbox_x = x2 - bbox_w
      bbox_y = y2 - bbox_h
    }

    updateBbox([bbox_w,bbox_h,bbox_x+food_cam_pos[0],bbox_y+food_cam_pos[1]])
    updateColor3("#ff3300")

  }

  function test(evt){
    
    let x2 = Math.round(evt.nativeEvent.locationX)
    let y2 = Math.round(evt.nativeEvent.locationY)
    let xy = String(x2) + " " + String(y2)
    updateMsg("bitch")

    
  }

  return (
    <View style={styles.overall_screen}>

      {/* camera feeds */}
      <Image style={styles.face_cam} source={require('./assets/1.jpg')} />
      <Image
        style={styles.food_cam}
        source={require('./assets/2.jpg')}
        onTouchStart={evt => getXY(evt)}
        onTouchMove = {evt => draw_bbox(evt)}
        onTouchEnd = {evt => draw_bbox(evt)}
      />

      {/* text prompt area */}
      <View style={styles.text_prompt}>
        <Text style={{ fontSize: 20 }}>{msg}</Text>
      </View>

      {/* bounding box */}
      { draw == true && 
      (<View style={bboxStyle(bb,bbox_color)} >
        <View style = {adjust_point_style(-15,-12,adj_color)} onTouchEnd = {evt => adjust_point(evt,1)} />
        <View style = {adjust_point_style("100%",-12,adj_color)} onTouchEnd = {evt => adjust_point(evt,2)}/>
        <View style = {adjust_point_style(-10,"100%",adj_color)} onTouchEnd = {evt => adjust_point(evt,3)}/>
        <View style = {adjust_point_style("100%","100%",adj_color)} onTouchEnd = {evt => adjust_point(evt,4)}/>
      </View>)}

      <View style={topBtn_style(food_cam_pos,bbox_btn_color,0,-55)} onTouchStart={evt => enable_Bbox()} >
        <Text style={{ fontSize: 30, fontWeight: 'bold' }} >+</Text>
      </View>

      { draw == true && 
      (<View style={topBtn_style(food_cam_pos,"#00cc00", +55,-55)} onTouchStart = {evt => add_bbox()}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Add</Text>
      </View>)}

       {/* acqusition mode buttons */}
       {/* "#99ff33","#9933ff","#0099cc","#ff3300" */}
      {pick_acq == true && 
      (<View style= {bottomBtn_style(0,"#99ff33")} onTouchStart = {evt => choose_acq_mode(1)}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Fork</Text>
      </View>)}

      {pick_acq == true &&
      (<View style= {bottomBtn_style(120,"#9933ff")} onTouchStart = {evt => choose_acq_mode(2)}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Spoon</Text>
      </View>)}
      
      {pick_acq == true &&
      (<View style= {bottomBtn_style(240,"#0099cc")} onTouchStart = {evt => choose_acq_mode(3)}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Grab</Text>
      </View>)}
      
      {pick_acq == true &&
      (<View style= {bottomBtn_style(360,"#ff3300")} onTouchStart = {evt => choose_acq_mode(0)}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >None</Text>
      </View>)}


      {/* yes/no and done buttons */}
      {ask_q == true &&
      (<View style= {bottomBtn_style(120,"#00cc00")} onTouchStart = {evt => choose_yn(1)}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Yes</Text>
      </View>)}
      
      {ask_q == true &&
      (<View style= {bottomBtn_style(240,"#ff3300")} onTouchStart = {evt => choose_yn(0)}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >No</Text>
      </View>)}
      
      {ask_done == true &&
      (<View style= {bottomBtn_style(180,"#3366ff")} onTouchStart = {evt => choose_done()}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Done</Text>
      </View>)}



    </View>
  );
};

function bottomBtn_style(x,color){
  return{
    width: 100,
    height: 40,
    position: 'absolute',
    top: (h * .85), // 650
    left: (w * .35) + x,
    borderRadius:20,
    justifyContent: 'center',
    backgroundColor: color, //"#ff3300",
    justifyContent: 'center',
    alignItems: 'center',
  }
}

function bboxStyle(bb,bbox_color) {
  return {
    position: 'absolute',
    left: bb[2], //(w * .51), //+ bb[2],
    top: bb[3],//(h * 0.15) + bb[3],
    width: bb[0],
    height: bb[1],
    borderWidth: 3,
    borderColor: bbox_color,//"#00cc00",
  }
}

function topBtn_style(food_cam_pos,color,x,y) {
  return {
    width: 50,
    height: 50,
    position: 'absolute',
    top: food_cam_pos[1] + y, //-55
    left: food_cam_pos[0] + x,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center',
  }
}

function adjust_point_style(p1,p2, adj_color){
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


  text_prompt: {
    width: 500,
    height: 40,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: h * .78, // 650
    left: w * .35, // 500
    borderRadius: 5,
  },

});

export default App;

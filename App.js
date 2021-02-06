/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
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

//function App (){
const App: () => React$Node = () => {
  const [msg, updateMsg] = useState('hello user');

  function printXY(evt) {
    let xy = String(Math.round(evt.nativeEvent.locationX)) + ' ' + String(Math.round(evt.nativeEvent.locationY));
    //let s = String(w) + ' ' + String(h)
    updateMsg(xy);
  }

  return (
    <View style={styles.overall_screen}>
      <Image style={styles.face_cam} source={require('./assets/1.jpg')} />
      <Image
        style={styles.food_cam}
        source={require('./assets/2.jpg')}
        onTouchStart={evt => printXY(evt)}
      />

      <View style={styles.text_prompt}>
        <Text style={{fontSize: 20}}>{msg}</Text>
      </View>
    </View>
  );
};

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 HELLLLfff
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>HELLLLLLLO</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 YEOOOOOOOOOOOOOO
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

const styles = StyleSheet.create({
  face_cam: {
    width: 640,
    height: 480,
    position: 'absolute',
    top: h*0.15, //140
    left: w*0.06, //100
    borderRadius: 5,
  },
  food_cam: {
    width: 640,
    height: 480,
    position: 'absolute',
    top: h*0.15, //140
    left: w*.51, //800
    borderRadius: 5,
  },

  overall_screen: {
    width: w,
    height: h,
    backgroundColor: Colors.white,
  },

  text_prompt: {
    width: 500,
    height: 40,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: h*.8, // 650
    left: w*.35, // 500
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

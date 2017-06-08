import React from 'react';
import { Text, View } from 'react-native';
import Camera from 'react-native-camera';

const App = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'skyblue',
    }}
  >
    <Camera
      onBarCodeRead={e => {
        console.log(e.data);
        console.log(e.type);
        console.log(e.bounds);
      }}
      style={{ flex: 1 }}
    />
  </View>
);

export default App;

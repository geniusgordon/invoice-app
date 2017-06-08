import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import QRCode from './containers/QRCode';

const App = StackNavigator({
  QRCode: { screen: QRCode },
});

export default App;

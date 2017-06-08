import React from 'react';
import { StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Home from './containers/Home';
import QRCode from './containers/QRCode';
import Account from './containers/Account';

const App = TabNavigator({
  Home: { screen: Home },
  QRCode: { screen: QRCode },
  Account: { screen: Account },
}, {
  ...TabNavigator.Presets.iOSBottomTabs,
  tabBarOptions: {
    showLabel: false,
  },
});

export default App;

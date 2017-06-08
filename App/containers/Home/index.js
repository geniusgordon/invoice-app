import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Invoice from '../Invoice';
import Account from '../Account';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Navigator = TabNavigator(
  {
    Invoice: { screen: Invoice },
    Account: { screen: Account },
  },
  {
    ...TabNavigator.Presets.iOSBottomTabs,
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      style: {
        zIndex: 1,
      },
      showLabel: false,
    },
  },
);

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Navigator />
    <View style={styles.iconWrapper}>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => navigation.navigate('QRCode')}
      >
        <Icon name="camera" size={40} />
      </TouchableHighlight>
    </View>
  </View>
);

Home.navigationOptions = {
  header: null,
};

export default Home;

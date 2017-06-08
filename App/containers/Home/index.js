import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => <Text>Home</Text>;

Home.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="home" size={30} color={tintColor} />
  ),
};

export default Home;

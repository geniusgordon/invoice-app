import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Invoice = () => <Text>Invoice</Text>;

Invoice.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="home" size={30} color={tintColor} />
  ),
};

export default Invoice;

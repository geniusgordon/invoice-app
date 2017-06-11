import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GREY, BLACK } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: 64,
    flexDirection: 'row',
  },
  status: {
    width: 48,
    height: 48,
    borderRadius: 32,
    marginRight: 8,
    color: 'white',
    backgroundColor: GREY,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  serial: {
    fontSize: 16,
    color: BLACK,
  },
});

const ListItem = ({ firstSerial, secondSerial, year, month, status }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.status}>尚未{'\n'}開獎</Text>
    </View>
    <View>
      <Text style={styles.serial}>{firstSerial} - {secondSerial}</Text>
      <Text>{year}/{month}</Text>
    </View>
  </View>
);

export default ListItem;

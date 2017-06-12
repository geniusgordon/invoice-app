import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ListItem from './ListItem';

const styles = StyleSheet.create({
  list: {
    paddingTop: 8,
    paddingBottom: 8,
  },
});

const History = ({ history }) => (
  <View style={styles.list}>
    {history.map(invoice => (
      <ListItem key={invoice.id} {...invoice} />
    ))}
  </View>
);

export default History;

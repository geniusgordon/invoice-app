import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import ListItem from './ListItem';
import { GREEN } from '../../constants/colors';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const styles = StyleSheet.create({
  list: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  empty: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: GREEN,
  },
  emptyText: {
    padding: 16,
    fontSize: 16,
  },
  focusContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -50,
    alignItems: 'center',
  },
  focus: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
  },
});

const History = ({ history }) => {
  if (history.length === 0) {
    return (
      <View style={styles.empty}>
        <View style={styles.focusContainer}>
          <Text style={styles.emptyText}>你還沒有任何發票，來新增你的第一張</Text>
          <View style={styles.focus} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.list}>
      {history.map(invoice => <ListItem key={invoice.id} {...invoice} />)}
    </View>
  );
};

export default History;

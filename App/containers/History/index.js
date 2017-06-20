import React, { Component } from 'react';
import { StyleSheet, Text, Vibration, View } from 'react-native';
import ListItem from './ListItem';
import { Screen } from '../../components';
import { BLUE } from '../../constants/colors';

const styles = StyleSheet.create({
  list: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  empty: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: BLUE,
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

const selectedCount = selected => Object.values(selected).filter(s => s).length;

const History = ({ history, selected, onHistorySelect }) => {
  if (history.length === 0) {
    return (
      <View style={styles.empty}>
        <View style={styles.focusContainer}>
          <Text style={styles.emptyText}>新增你的第一張發票</Text>
          <View style={styles.focus} />
        </View>
      </View>
    );
  }
  const count = selectedCount(selected);
  return (
    <View style={styles.list}>
      {history.map(invoice =>
        <ListItem
          key={invoice.id}
          selected={selected[invoice.id]}
          selectedCount={count}
          invoice={invoice}
          onPress={() => {
            if (count > 0) {
              onHistorySelect(invoice);
            }
          }}
          onLongPress={() => {
            Vibration.vibrate(30);
            onHistorySelect(invoice);
          }}
        />,
      )}
    </View>
  );
};

export default History;

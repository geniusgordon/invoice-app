import React, { Component } from 'react';
import { StyleSheet, Text, Vibration, View } from 'react-native';
import { Icon } from 'react-native-elements';
import ListItem from './ListItem';
import { Screen } from '../../components';
import { GREY } from '../../constants/colors';

const styles = StyleSheet.create({
  list: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  empty: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: GREY,
  },
});

const selectedCount = selected => Object.values(selected).filter(s => s).length;

const History = ({ history, selected, onHistorySelect }) => {
  if (history.length === 0) {
    return (
      <View style={styles.empty}>
        <Icon name="view-list" size={64} color={GREY} />
        <Text style={styles.emptyText}>No items</Text>
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

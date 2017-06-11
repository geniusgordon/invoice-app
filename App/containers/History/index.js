import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ListItem from './ListItem';

const styles = StyleSheet.create({
  list: {
    paddingTop: 8,
    paddingBottom: 8,
  },
});

class History extends Component {
  state = {
    history: [
      {
        firstSerial: 'AA',
        secondSerial: '1234567890',
        year: '106',
        month: '05',
      },
      {
        firstSerial: 'BB',
        secondSerial: '0987654321',
        year: '106',
        month: '05',
      },
    ],
  };
  render() {
    const { history } = this.state;
    return (
      <View style={styles.list}>
        {history.map(invoice => (
          <ListItem key={invoice.secondSerial} {...invoice} />
        ))}
      </View>
    );
  }
}

export default History;

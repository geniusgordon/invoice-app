import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Interactable from 'react-native-interactable';
import History from '../History';
import Account from '../Account';
import Scanner from '../Scanner';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

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
  panel: {
    flex: 1,
    width: Screen.width,
    backgroundColor: 'white',
  },
  leftRightPanelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: Screen.width * 3,
    flexDirection: 'row',
  },
  bottomPanelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: Screen.height * 2,
  },
});

class Home extends Component {
  handleInvoiceRead = qrcodes => {
    console.log(qrcodes);
  };
  render() {
    return (
      <View style={styles.container}>
        <Scanner onInvoiceRead={this.handleInvoiceRead} />
        <Interactable.View
          horizontalOnly
          snapPoints={[
            { x: 0 },
            { x: -Screen.width, tension: 500, damping: 0.5 },
            { x: -Screen.width * 2 },
          ]}
          initialPosition={{ x: -Screen.width }}
          boundaries={{ left: -Screen.width * 2, right: 0 }}
          style={styles.leftRightPanelContainer}
        >
          <View style={styles.panel}>
            <History />
          </View>
          <View style={{ flex: 1 }} />
          <View style={styles.panel}>
            <Account />
          </View>
        </Interactable.View>
        <Interactable.View
          verticalOnly
          snapPoints={[{ y: 0 }, { y: Screen.height }]}
          initialPosition={{ y: 0 }}
          boundaries={{ top: 0, bottom: Screen.height }}
          style={styles.bottomPanelContainer}
        >
          <View style={styles.panel}>
            <Text>QQ</Text>
          </View>
        </Interactable.View>
      </View>
    );
  }
}

export default Home;

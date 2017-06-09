import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Interactable from 'react-native-interactable';
import Invoice from './Invoice';
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
  options: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
  },
});

class Home extends Component {
  state = {};
  handleInvoiceRead = qrcodes => {
    console.log(qrcodes);
  };
  handleKeyboardIconPress = () => {
    if (this.bottomPanel) {
      this.bottomPanel.snapTo({ index: 0 });
    }
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
        <View style={styles.options}>
          <Icon
            name="keyboard"
            color="white"
            size={48}
            onPress={this.handleKeyboardIconPress}
          />
        </View>
        <Interactable.View
          verticalOnly
          snapPoints={[{ y: 0 }, { y: Screen.height }]}
          initialPosition={{ y: Screen.height }}
          boundaries={{ top: 0, bottom: Screen.height }}
          style={styles.bottomPanelContainer}
          ref={ref => {
            this.bottomPanel = ref;
          }}
        >
          <View style={styles.panel}>
            <Invoice />
          </View>
        </Interactable.View>
      </View>
    );
  }
}

export default Home;

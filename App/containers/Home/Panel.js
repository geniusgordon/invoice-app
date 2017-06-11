import React from 'react';
import {
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Toolbar from './Toolbar';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

if (Platform.OS === 'ios') {
  StatusBar.currentHeight = 20;
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    width: Screen.width,
    backgroundColor: 'transparent',
  },
  scrollViewContent: {
    paddingTop: Toolbar.height,
    backgroundColor: 'transparent',
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    minHeight: Screen.height - Toolbar.height - StatusBar.currentHeight,
  },
});

const Panel = ({ children }) => (
  <View style={styles.panel}>
    <ScrollView>
      <View style={styles.scrollViewContent}>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </ScrollView>
  </View>
);

export default Panel;

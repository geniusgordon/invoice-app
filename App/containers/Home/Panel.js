import React from 'react';
import {
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Screen, Toolbar } from '../../components';

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
    height: 1000,
  },
});

const Panel = ({ children }) =>
  <View style={styles.panel}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.scrollViewContent}>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </ScrollView>
  </View>;

export default Panel;

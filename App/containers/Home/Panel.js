import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Toolbar from './Toolbar';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

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
    minHeight: Screen.height,
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

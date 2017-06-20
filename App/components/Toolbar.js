import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

const height = 56;

const styles = StyleSheet.create({
  container: {
    height,
    backgroundColor: '#3F51B5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
});

const Toolbar = ({ title, toolbarStyle, titleStyle }) => (
  <Animated.View style={[styles.container, toolbarStyle]}>
    <Text style={[styles.title, titleStyle]}>{title}</Text>
  </Animated.View>
);

Toolbar.height = height;

export default Toolbar;

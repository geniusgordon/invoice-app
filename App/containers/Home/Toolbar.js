import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

const HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
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

const Toolbar = ({ title, style, titleStyle }) => (
  <Animated.View style={[styles.container, style]}>
    <Text style={[styles.title, titleStyle]}>{title}</Text>
  </Animated.View>
);

Toolbar.HEIGHT = HEIGHT;

export default Toolbar;

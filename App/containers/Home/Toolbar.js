import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

const height = 60;

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

const Toolbar = ({ title, style, titleContainerStyle }) => (
  <Animated.View style={[styles.container, style]}>
    <Animated.View style={titleContainerStyle}>
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  </Animated.View>
);

Toolbar.height = height;

export default Toolbar;

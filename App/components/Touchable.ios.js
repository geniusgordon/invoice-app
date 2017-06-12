import React, { PropTypes } from 'react';
import { TouchableOpacity, View } from 'react-native';

const Touchable = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View>
      {children}
    </View>
  </TouchableOpacity>
);

Touchable.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};

Touchable.defaultProps = {
  children: null,
  onPress: null,
};

export default Touchable;

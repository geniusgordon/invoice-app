import React, { PropTypes } from 'react';
import { TouchableOpacity, View } from 'react-native';

const Touchable = ({ children, onPress, onLongPress }) =>
  <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
    <View>
      {children}
    </View>
  </TouchableOpacity>;

Touchable.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};

Touchable.defaultProps = {
  children: null,
  onPress: null,
  onLongPress: null,
};

export default Touchable;

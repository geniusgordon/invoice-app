import React, { PropTypes } from 'react';
import { TouchableNativeFeedback, View } from 'react-native';

const Touchable = ({ children, style, borderless, onPress, onLongPress }) => {
  const background = borderless
    ? TouchableNativeFeedback.SelectableBackgroundBorderless()
    : TouchableNativeFeedback.SelectableBackground();

  return (
    <TouchableNativeFeedback
      style={style}
      background={background}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {children}
    </TouchableNativeFeedback>
  );
};

Touchable.propTypes = {
  children: PropTypes.node,
  style: View.propTypes.style,
  borderless: PropTypes.bool,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};

Touchable.defaultProps = {
  children: null,
  style: null,
  borderless: false,
  onPress: null,
  onLongPress: null,
};

export default Touchable;

import React, { PropTypes } from 'react';
import { TouchableNativeFeedback, View } from 'react-native';

const Touchable = ({ children, style, borderless, onPress }) => {
  const background = borderless
    ? TouchableNativeFeedback.SelectableBackgroundBorderless()
    : TouchableNativeFeedback.SelectableBackground();

  return (
    <TouchableNativeFeedback
      style={style}
      onPress={onPress}
      background={background}
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
};

Touchable.defaultProps = {
  children: null,
  style: null,
  borderless: false,
  onPress: null,
};

export default Touchable;

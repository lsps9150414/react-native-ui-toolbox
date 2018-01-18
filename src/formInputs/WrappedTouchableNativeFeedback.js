import PropTypes from 'prop-types';
import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

import { DEFAULT_COLORS } from '../constants/colors';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: View.propTypes.style,
  onPress: PropTypes.func,
  rippleColor: PropTypes.string,
};

const defaultProps = {
  children: undefined,
  style: undefined,
  onPress: undefined,
  rippleColor: DEFAULT_COLORS[2].toHexString(),
};

const WrappedTouchableNativeFeedback = (props) => {
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity {...props}>
        {props.children}
      </TouchableOpacity>
    );
  }
  return (
    <View {...props} style={props.style}>
      <TouchableNativeFeedback
        {...props}
        onPress={props.onPress}
        background={TouchableNativeFeedback.Ripple(props.rippleColor, true)}
      >
        {props.children}
      </TouchableNativeFeedback>
    </View>
  );
};

WrappedTouchableNativeFeedback.propTypes = propTypes;
WrappedTouchableNativeFeedback.defaultProps = defaultProps;

export default WrappedTouchableNativeFeedback;

import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { DEFAULT_COLORS } from '../../constants/colors';

// HOC Internal
export const HOCInternalPropTypes = {
  renderIcon: PropTypes.func,
  onTouched: PropTypes.func,
};

// Input Field Basic
export const inputFieldPropTypes = {
  component: PropTypes.any,
  componentProps: PropTypes.object,
  onValueChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export const defaultInputFieldProps = {
  component: TouchableOpacity,
  componentProps: undefined,
  onValueChange: undefined,
};

// Styles
export const stylePropTypes = {
  containerStyle: View.propTypes.style,
  contentContainerStyle: View.propTypes.style,
  inputContainerStyle: View.propTypes.style,
  inputStyle: Text.propTypes.style,
};

// Modal
export const modalPropTypes = {
  cancelBtnText: PropTypes.string,
  confirmBtnText: PropTypes.string,
  controlBarHeight: PropTypes.number,
  controlBarPosition: PropTypes.oneOf(['top', 'bottom']),
  height: PropTypes.number,
  fullScreen: PropTypes.bool,
  containerStyle: View.propTypes.style,
  bodyContainerStyle: View.propTypes.style,
  bodyContentContainerStyle: View.propTypes.style,
  controlBarStyle: View.propTypes.style,
  cancelBtnStyle: View.propTypes.style,
  confirmBtnStyle: View.propTypes.style,
  cancelBtnTextStyle: Text.propTypes.style,
  confirmBtnTextStyle: Text.propTypes.style,
};

export const defaultModalProps = {
  cancelBtnText: 'CANCEL',
  confirmBtnText: 'CONFIRM',
  controlBarHeight: undefined,
  controlBarPosition: 'top',
  height: undefined,
  fullScreen: false,
  containerStyle: undefined,
  bodyContainerStyle: undefined,
  bodyContentContainerStyle: undefined,
  controlBarStyle: undefined,
  cancelBtnStyle: undefined,
  confirmBtnStyle: undefined,
  cancelBtnTextStyle: undefined,
  confirmBtnTextStyle: undefined,
};

// Icon
export const iconPropTypes = {
  showIcon: PropTypes.bool,
  icon: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    containerStyle: View.propTypes.style,
  }),
};

export const defaultIconProps = {
  showIcon: false,
  icon: {
    name: 'settings',
    type: 'material',
    size: 28,
    color: DEFAULT_COLORS[2].toHexString(),
    containerStyle: { marginRight: 8, marginLeft: 0 },
  },
};

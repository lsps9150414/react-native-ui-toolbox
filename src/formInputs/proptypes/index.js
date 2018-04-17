import {
  Text,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

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
  containerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
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
  containerStyle: ViewPropTypes.style,
  bodyContainerStyle: ViewPropTypes.style,
  bodyContentContainerStyle: ViewPropTypes.style,
  controlBarStyle: ViewPropTypes.style,
  cancelBtnStyle: ViewPropTypes.style,
  confirmBtnStyle: ViewPropTypes.style,
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
    containerStyle: ViewPropTypes.style,
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

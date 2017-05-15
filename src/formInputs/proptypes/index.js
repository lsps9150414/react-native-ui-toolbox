import PropTypes from 'prop-types';
import {
  Text,
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
  onValueChange: PropTypes.func,
  placeholder: PropTypes.string,
};

// Styles
export const stylePropTypes = {
  containerStyle: View.propTypes.style,
  contentContainerStyle: View.propTypes.style,
  inputStyle: Text.propTypes.style,
};

// Modal
export const modalPropTypes = {
  modal: PropTypes.shape({
    cancelBtnText: PropTypes.string,
    confirmBtnText: PropTypes.string,
    controlBarHeight: PropTypes.number,
    height: PropTypes.number,
    fullScreen: PropTypes.bool,
  }),
};

export const defaultModalProps = {
  modal: {
    cancelBtnText: 'CANCEL',
    confirmBtnText: 'CONFIRM',
    controlBarHeight: undefined,
    height: undefined,
    fullScreen: false,
  },
};

// Icon
export const iconPropTypes = {
  showIcon: PropTypes.bool,
  icon: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    style: View.propTypes.style,
  }),
};

export const defaultIconProps = {
  showIcon: false,
  icon: {
    name: 'settings',
    type: 'material',
    size: 28,
    color: DEFAULT_COLORS[2].toHexString(),
    containerStyle: { marginRight: 8 },
  },
};

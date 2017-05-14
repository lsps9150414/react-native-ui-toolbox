import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';

export const fieldProptypes = {
  containerStyle: View.propTypes.style,
  inputStyle: Text.propTypes.style,
};

export const modalPropTypes = {
  cancelBtnText: PropTypes.string,
  confirmBtnText: PropTypes.string,
  controlBarHeight: PropTypes.number,
  modalHeight: PropTypes.number,
  fullScreen: PropTypes.bool,
};

export const stlyePropTypes = {
  containerStyle: View.propTypes.style,
  touchableContainerStyle: View.propTypes.style,
  inputStyle: Text.propTypes.style,
};

export const defaultModalPropTypes = {
  fullScreen: false,
};

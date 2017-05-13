import PropTypes from 'prop-types';
import React, {
  Component,
} from 'react';
import { FormInput } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { innerContainer } from './styles';

const propTypes = {
  value: PropTypes.string,
  containerStyle: View.propTypes.style,
  inputStyle: Text.propTypes.style,
};

const defaultProps = {};

const styles = StyleSheet.create({
  inputStyle: {
    ...innerContainer,
  },
});

export default class FormTextInput extends Component {

  render() {
    return (
      <FormInput
        {...this.props}
        value={this.props.value}
        containerStyle={[this.props.containerStyle]}
        inputStyle={[styles.inputStyle, this.props.inputStyle]}
      />
    );
  }

}

FormTextInput.propTypes = propTypes;
FormTextInput.defaultProps = defaultProps;

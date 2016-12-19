import React, {
  Component,
  PropTypes,
} from 'react';
import { FormInput } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const propTypes = {
  value: PropTypes.string.isRequired,
  containerStyle: View.propTypes.style,
  inputStyle: Text.propTypes.style,
};

const defaultProps = {};

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
  },
});

export default class TextInput extends Component {

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

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

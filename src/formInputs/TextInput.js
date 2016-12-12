import React, {
  Component,
  PropTypes,
} from 'react';
import { FormInput } from 'react-native-elements';
import {
  View,
} from 'react-native';

const propTypes = {
};

const defaultProps = {};

export default class TextInput extends Component {

  render() {
    return (
      <FormInput {...this.props} />
    );
  }

}

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

import PropTypes from 'prop-types';
import React, {
  Component,
} from 'react';
import { FormInput } from 'react-native-elements';

import { stlyePropTypes } from './proptypes';

const propTypes = {
  value: PropTypes.string,
  ...stlyePropTypes,
};

const defaultProps = {};

export default class FormTextInput extends Component {
  handleOnChange = () => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange();
    }
    this.props.onTouched();
  }

  render() {
    return (
      <FormInput
        {...this.props}
        value={this.props.value}
        containerStyle={[this.props.containerStyle]}
        inputStyle={[this.props.inputStyle]}
        onChange={this.handleOnChange}
        underlineColorAndroid={'transparent'}
      />
    );
  }
}

FormTextInput.propTypes = propTypes;
FormTextInput.defaultProps = defaultProps;

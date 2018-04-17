import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  TextInput,
  View,
} from 'react-native';

import {
  defaultInputFieldProps,
  iconPropTypes,
  inputFieldPropTypes,
  modalPropTypes,
  stylePropTypes,
} from './proptypes';

const propTypes = {
  value: PropTypes.string,
  ...stylePropTypes,
  ...inputFieldPropTypes,
  ...stylePropTypes,
  ...modalPropTypes,
  ...iconPropTypes,
};

const defaultProps = {
  value: undefined,
  ...defaultInputFieldProps,
};

export default class FormTextInput extends Component {
  handleValueChange = (value) => {
    if (typeof this.props.onValueChange === 'function') {
      this.props.onTouched();
      this.props.onValueChange(value);
    }
  }

  render() {
    return (
      <View style={[this.props.containerStyle]}>
        <View style={[this.props.contentContainerStyle]}>
          {this.props.showIcon && this.props.renderIcon()}
          <TextInput
            underlineColorAndroid="transparent"
            {...this.props}
            value={this.props.value}
            style={[
              { flex: 1, alignSelf: 'stretch', textAlignVertical: 'center' },
              this.props.multiline && { textAlignVertical: 'top' },
              this.props.inputStyle,
            ]}
            onChangeText={this.handleValueChange}
          />
        </View>
      </View>
    );
  }
}

FormTextInput.propTypes = propTypes;
FormTextInput.defaultProps = defaultProps;

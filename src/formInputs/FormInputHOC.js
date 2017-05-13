/*
Add validation to InnerComponent
*/

import PropTypes from 'prop-types';
import React, {
  Component,
} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { DEFAULT_COLORS } from '../constants/colors';
import { fieldContainer } from './styles';

const propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  validator: PropTypes.func,

  containerStyle: View.propTypes.style,
  validContainerStyle: View.propTypes.style,
  invalidContainerStyle: View.propTypes.style,

  inputStyle: Text.propTypes.style,
  validInputStyle: Text.propTypes.style,
  invalidInputStyle: Text.propTypes.style,

  errorText: PropTypes.string,
  errorContainerStyle: View.propTypes.style,
  errorTextStyle: View.propTypes.style,
};

const defaultProps = {};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: DEFAULT_COLORS[3].toHexString(),
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 36,
  },
  input: {
    color: DEFAULT_COLORS[3].toHexString(),
    fontSize: 16,
  },
  errorContainer: {
    ...fieldContainer,
    ...Platform.select({
      android: {
        paddingHorizontal: 4,
      },
    }),
  },
  errorText: {
    color: '#ff0000',
  },
});

export default (InnerComponent) => {
  class FormInputHOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        touched: false,
      };
    }

    getValidationStyles(touched, validator, value) {
      const defaultContainerStyle = this.props.containerStyle;
      const defaultInputStyle = this.props.inputStyle;
      const invalidContainerStyle = this.props.invalidContainerStyle;
      const invalidInputStyle = this.props.invalidInputStyle;
      const validContainerStyle = this.props.validContainerStyle;
      const validInputStyle = this.props.validInputStyle;

      if (touched) {
        if (typeof validator === 'function' && validator(value)) {
          return {
            // Note: Cannot use spread assign here b.c. style prop may be array.
            containerStyle: { default: defaultContainerStyle, specified: validContainerStyle },
            inputStyle: { default: defaultInputStyle, specified: validInputStyle },
          };
        }
        return {
          containerStyle: { default: defaultContainerStyle, specified: invalidContainerStyle },
          inputStyle: { default: defaultInputStyle, specified: invalidInputStyle },
        };
      }
      return {
        containerStyle: { default: defaultContainerStyle },
        inputStyle: { default: defaultInputStyle },
      };
    }
    handleOnFocus = () => {
      if (this.props.onChange) { this.props.onChange(); }
      if (!this.state.touched) { this.setState({ touched: true }); }
    }

    renderError = () => {
      if (
        this.props.errorText && this.props.validator && // Error materials provided
        !this.props.validator(this.props.value) && // Invalid value
        this.state.touched // Field has been touched
      ) {
        return (
          <View style={[styles.errorContainer, this.props.errorContainerStyle]}>
            <Text style={[styles.errorText, this.props.errorTextStyle]}>
              {this.props.errorText}
            </Text>
          </View>
        );
      }
      return null;
    }

    render() {
      const {
        containerStyle,
        inputStyle,
      } = this.getValidationStyles(this.state.touched, this.props.validator, this.props.value);

      return (
        <View style={{ alignSelf: 'stretch' }}>
          <InnerComponent
            {...this.props}
            containerStyle={[styles.container, containerStyle.default, containerStyle.specified]}
            inputStyle={[styles.input, inputStyle.default, inputStyle.specified]}
            onChange={this.handleOnFocus}
            underlineColorAndroid={'transparent'}
          />
          {this.renderError()}
        </View>
      );
    }

  }

  FormInputHOC.propTypes = propTypes;
  FormInputHOC.defaultProps = defaultProps;

  return FormInputHOC;
};

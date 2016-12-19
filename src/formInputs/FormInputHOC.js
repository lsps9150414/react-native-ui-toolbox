import React, {
  Component,
  PropTypes,
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
  touchableContainerStyle: View.propTypes.style,

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

      this.handleOnFocus = this.handleOnFocus.bind(this);
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
            containerStyle: { ...defaultContainerStyle, ...validContainerStyle },
            inputStyle: { ...defaultInputStyle, ...validInputStyle },
          };
        }
        return {
          containerStyle: { ...defaultContainerStyle, ...invalidContainerStyle },
          inputStyle: { ...defaultInputStyle, ...invalidInputStyle },
        };
      }
      return {
        containerStyle: { ...defaultContainerStyle, ...defaultContainerStyle },
        inputStyle: { ...defaultInputStyle, ...defaultInputStyle },
      };
    }
    handleOnFocus() {
      if (this.props.onChange) {
        this.props.onChange();
      }
      if (!this.state.touched) {
        this.setState({ touched: true });
      }
    }

    render() {
      const {
        containerStyle,
        inputStyle,
      } = this.getValidationStyles(this.state.touched, this.props.validator, this.props.value);
      const displayError =
        this.props.errorText && this.props.validator &&
        !this.props.validator(this.props.value) && this.state.touched;

      return (
        <View style={{ alignSelf: 'stretch' }}>
          <InnerComponent
            {...this.props}
            containerStyle={[styles.container, containerStyle]}
            inputStyle={[styles.input, inputStyle]}
            touchableContainerStyle={this.props.touchableContainerStyle}
            onChange={this.handleOnFocus}
            touched={this.state.touched}
            underlineColorAndroid={'transparent'}
          />
          {displayError && (
            <View style={[styles.errorContainer, this.props.errorContainerStyle]}>
              <Text style={[styles.errorText, this.props.errorTextStyle]}>
                {this.props.errorText}
              </Text>
            </View>
          )}
        </View>
      );
    }

  }

  FormInputHOC.propTypes = propTypes;
  FormInputHOC.defaultProps = defaultProps;

  return FormInputHOC;
};

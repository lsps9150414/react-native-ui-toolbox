import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

/* eslint-disable react/no-unused-prop-types */
const propTypes = {
  containerStyle: View.propTypes.style,
  errorContainerStyle: View.propTypes.style,
  errorText: PropTypes.string,
  errorTextStyle: View.propTypes.style,
  inputStyle: Text.propTypes.style,
  invalidContainerStyle: View.propTypes.style,
  invalidInputStyle: Text.propTypes.style,
  onChange: PropTypes.func,
  validator: PropTypes.func,
  validContainerStyle: View.propTypes.style,
  validInputStyle: Text.propTypes.style,
  value: PropTypes.any,
};
/* eslint-enable react/no-unused-prop-types */

const defaultProps = {};

const styles = StyleSheet.create({
  errorContainer: {
    marginHorizontal: 20,
  },
  errorText: {
    color: '#ff0000',
  },
});

export default (InnerComponent) => {
  class InputHOC extends Component {
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
      const validContainerStyle = this.props.validContainerStyle || defaultContainerStyle;
      const validInputStyle = this.props.validInputStyle || defaultInputStyle;
      const invalidContainerStyle = this.props.invalidContainerStyle || defaultContainerStyle;
      const invalidInputStyle = this.props.invalidInputStyle || defaultInputStyle;

      if (touched) {
        if (typeof validator === 'function' && validator(value)) {
          return {
            containerStyle: validContainerStyle,
            inputStyle: validInputStyle,
          };
        }
        return {
          containerStyle: invalidContainerStyle,
          inputStyle: invalidInputStyle,
        };
      }
      return {
        containerStyle: defaultContainerStyle,
        inputStyle: defaultInputStyle,
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
        <View>
          <InnerComponent
            {...this.props}
            onChange={this.handleOnFocus}
            containerStyle={containerStyle}
            inputStyle={inputStyle}
            touched={this.state.touched}
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

  InputHOC.propTypes = propTypes;
  InputHOC.defaultProps = defaultProps;

  return InputHOC;
};

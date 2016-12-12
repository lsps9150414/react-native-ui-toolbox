import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Text,
  View,
} from 'react-native';

/* eslint-disable react/no-unused-prop-types */
const propTypes = {
  containerStyle: View.propTypes.style,
  inputStyle: Text.propTypes.style,
  invalidContainerStyle: View.propTypes.style,
  invalidInputStyle: Text.propTypes.style,
  onFocus: PropTypes.func,
  validator: PropTypes.func,
  validContainerStyle: View.propTypes.style,
  validInputStyle: Text.propTypes.style,
  value: PropTypes.any,
};
/* eslint-enable react/no-unused-prop-types */

const defaultProps = {};

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
      if (this.props.onFocus) {
        this.props.onFocus();
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

      return (
        <InnerComponent
          {...this.props}
          onFocus={this.handleOnFocus}
          containerStyle={containerStyle}
          inputStyle={inputStyle}
        />
      );
    }

  }

  InputHOC.propTypes = propTypes;
  InputHOC.defaultProps = defaultProps;

  return InputHOC;
};

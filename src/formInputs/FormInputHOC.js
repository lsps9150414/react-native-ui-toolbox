/*
Add validation to InnerComponent
*/

import PropTypes from 'prop-types';
import React, {
  Component,
} from 'react';
import { Icon } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { DEFAULT_COLORS } from '../constants/colors';
import {
  defaultIconProps,
  defaultModalProps,
  iconPropTypes,
  modalPropTypes,
} from './proptypes';

const propTypes = {
  value: PropTypes.any,
  validator: PropTypes.func,

  // For the wrapper component around the input field and the error.
  wrapperStyle: View.propTypes.style,
  // For the touchable component.
  containerStyle: View.propTypes.style,
  validContainerStyle: View.propTypes.style,
  invalidContainerStyle: View.propTypes.style,
  // For the touchable content component.
  contentContainerStyle: View.propTypes.style,
  // For the value display text.
  inputStyle: Text.propTypes.style,
  validInputStyle: Text.propTypes.style,
  invalidInputStyle: Text.propTypes.style,

  errorContainerStyle: View.propTypes.style,
  errorTextStyle: View.propTypes.style,
  errorText: PropTypes.string,

  ...modalPropTypes,
  ...iconPropTypes,
};

const defaultProps = {
  ...defaultModalProps,
  ...defaultIconProps,
};

const styles = StyleSheet.create({
  innerComponentContainer: {
    height: 36,
    justifyContent: 'center', // Vertical align contentContainer
    borderBottomColor: DEFAULT_COLORS[3].toHexString(),
    borderBottomWidth: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Vertical align icon & input display
    paddingHorizontal: 8,
  },
  input: {
    color: DEFAULT_COLORS[3].toHexString(),
    fontSize: 16,
  },
  errorContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
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

    handleOnTouched = () => {
      if (!this.state.touched) { this.setState({ touched: true }); }
    }

    renderError = () => {
      if (
        this.props.errorText && typeof this.props.validator === 'function' && // Error materials provided
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

    renderIcon = () => {
      const iconProps = { ...defaultProps.icon, ...this.props.icon };

      return (
        <View style={[iconProps.containerStyle]}>
          <Icon
            name={iconProps.name}
            type={iconProps.type}
            size={iconProps.size}
            color={iconProps.color}
          />
        </View>
      );
    }

    render() {
      const {
        containerStyle,
        inputStyle,
      } = this.getValidationStyles(this.state.touched, this.props.validator, this.props.value);

      return (
        <View style={[this.props.wrapperStyle]}>
          <InnerComponent
            {...this.props}
            containerStyle={[
              styles.innerComponentContainer,
              containerStyle.default,
              containerStyle.specified,
            ]}
            contentContainerStyle={[styles.contentContainer, this.props.contentContainerStyle]}
            inputStyle={[styles.input, inputStyle.default, inputStyle.specified]}
            modal={this.props.modal}
            icon={this.props.icon}
            // HOC inner props
            onTouched={this.handleOnTouched}
            renderIcon={this.renderIcon}
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

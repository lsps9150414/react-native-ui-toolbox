/*
Add validation, icon rendering to InnerComponent
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
  FORM_INPUT_HEIGHT,
  FORM_INPUT_PADDING,
} from '../constants/layouts';
import {
  defaultIconProps,
  defaultModalProps,
  iconPropTypes,
  modalPropTypes,
  stylePropTypes,
} from './proptypes';

const propTypes = {
  value: PropTypes.any,

  // For the wrapper component around the input field and the error.
  wrapperStyle: View.propTypes.style,
  // For the touchable component.
  validContainerStyle: View.propTypes.style,
  invalidContainerStyle: View.propTypes.style,
  // For the value display text.
  validInputStyle: Text.propTypes.style,
  invalidInputStyle: Text.propTypes.style,

  errorContainerStyle: View.propTypes.style,
  errorTextStyle: View.propTypes.style,
  errorText: PropTypes.string,

  validator: PropTypes.func,

  // For the inner component.
  ...stylePropTypes,
  ...iconPropTypes,
  // For FormPicker & FormSelect.
  modal: PropTypes.shape({
    ...modalPropTypes,
  }),
  checkBox: PropTypes.object,
};

const defaultProps = {
  modal: {
    ...defaultModalProps,
  },
  ...defaultIconProps,
};

const styles = StyleSheet.create({
  wrapper: {
  },
  // correspond to props.containerStyle, styles for the touchable
  innerComponentContainer: {
    justifyContent: 'center', // Vertical align contentContainer
    borderBottomColor: DEFAULT_COLORS[3].toHexString(),
    borderBottomWidth: 1,
    height: FORM_INPUT_HEIGHT,
  },
  // correspond to props.contentContainerStyle, containing iconContainer and inputContainer
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', // Vertical align icon & input display
    justifyContent: 'flex-start', // Horizontal align icon & input display
    padding: FORM_INPUT_PADDING,
  },
  // correspond to props.inputContainerStyle
  inputContainer: {
  },
  // correspond to props.inputStyle
  input: {
    color: DEFAULT_COLORS[3].toHexString(),
    fontSize: 16,
  },
  errorContainer: {
    paddingHorizontal: FORM_INPUT_PADDING,
    paddingBottom: FORM_INPUT_PADDING,
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

      if (typeof validator === 'function' && touched) {
        if (validator(value)) {
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
      const iconProps = {
        ...defaultProps.icon,
        ...this.props.icon,
        containerStyle: { ...defaultProps.icon.containerStyle, ...this.props.icon.containerStyle },
      };

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

    renderInputDisplay = (displayText) => {
      const { inputStyle } =
        this.getValidationStyles(this.state.touched, this.props.validator, this.props.value);

      return (
        <View style={[styles.inputContainer, this.props.inputContainerStyle]}>
          <Text
            style={[styles.input, inputStyle.default, inputStyle.specified]}
            ellipsizeMode={'tail'}
            numberOfLines={1}
          >
            {displayText}
          </Text>
        </View>
      );
    }

    render() {
      const {
        containerStyle,
        inputStyle,
      } = this.getValidationStyles(this.state.touched, this.props.validator, this.props.value);
      const {
        wrapperStyle,
        ...innerComponentProps,
      } = this.props;

      return (
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <InnerComponent
            {...innerComponentProps}
            containerStyle={[
              styles.innerComponentContainer,
              containerStyle.default,
              containerStyle.specified,
            ]}
            contentContainerStyle={[styles.contentContainer, this.props.contentContainerStyle]}
            inputStyle={[styles.input, inputStyle.default, inputStyle.specified]}
            modal={this.props.modal}
            checkBox={this.props.checkBox}
            icon={this.props.icon}
            // HOC inner props
            onTouched={this.handleOnTouched}
            renderIcon={this.renderIcon}
            renderInputDisplay={this.renderInputDisplay}
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

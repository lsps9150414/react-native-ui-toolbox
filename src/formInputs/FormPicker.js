import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import { View } from 'react-native';

import ModalContainer from './ModalContainer';
import {
  defaultInputFieldProps,
  iconPropTypes,
  inputFieldPropTypes,
  modalPropTypes,
  stylePropTypes,
} from './proptypes';

const ACCEPT_VALUE_TYPES = [PropTypes.string, PropTypes.number, PropTypes.bool];
const ACCEPT_LABEL_TYPES = [PropTypes.string, PropTypes.number];
const propTypes = {
  pickedValue: PropTypes.oneOfType(ACCEPT_VALUE_TYPES),
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType(ACCEPT_VALUE_TYPES),
    label: PropTypes.oneOfType(ACCEPT_LABEL_TYPES),
  })).isRequired,
  ...inputFieldPropTypes,
  ...stylePropTypes,
  ...iconPropTypes,
  modal: PropTypes.shape({
    ...modalPropTypes,
  }),
  checkBox: PropTypes.object,
};

const defaultProps = {
  items: [
    { label: 'item 1', value: 'item 1 value' },
    { label: 'item 2', value: 'item 2 value' },
  ],
  pickedValue: undefined,
  placeholder: 'Pick...',
  ...defaultInputFieldProps,
};

export default class FormPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedValue: props.pickedValue,
      tempValue: props.pickedValue,
      modalVisible: false,
    };
    this.updateItemsDictionary(props.items);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.items, this.props.items)) {
      this.updateItemsDictionary(nextProps.items);
    }
    if (!_.isEqual(nextProps.pickedValue, this.props.pickedValue)) {
      this.updateSelectedValue(nextProps.pickedValue);
    }
  }

  getDisplayText = () => {
    if (this.valueIsEmpty(this.state.pickedValue)) {
      return this.props.placeholder;
    }
    return this.itemsDictionary[this.state.pickedValue];
  }

  valueIsEmpty = (pickedValue) => {
    // Note: number 0 and false are not empty.
    if (typeof pickedValue === 'number' || typeof pickedValue === 'boolean') {
      return false;
    }
    // Note: empty = undefined, null, NaN, ''(empty string)
    return !pickedValue;
  }

  updateItemsDictionary = (items) => {
    this.itemsDictionary = {};
    items.forEach((item) => { this.itemsDictionary[item.value] = item.label; });
  }

  updateSelectedValue = (pickedValue) => {
    this.setState({ pickedValue, tempValue: pickedValue });
  }

  handleValueChange = () => {
    this.setState({ pickedValue: this.state.tempValue }, () => {
      if (typeof this.props.onValueChange === 'function') {
        this.props.onTouched(); // For the HOC to manage touch state.
        this.props.onValueChange(this.state.pickedValue);
      }
    });
  }

  openModal = () => { this.setState({ modalVisible: true }); }

  closeModal = () => { this.setState({ modalVisible: false }); }

  handleModalCancel = () => {
    this.closeModal();
    this.setState({ tempValue: this.state.pickedValue });
  }

  handleModalConfirm = () => {
    this.closeModal();
    this.handleValueChange();
  }

  handleTempValueChange = (value) => { this.setState({ tempValue: value }); }

  renderItems = () => {
    if (this.props.items.length === 0) {
      return (<CheckBox title="No Options" />);
    }
    return (
      this.props.items.map((item, index) => (
        <CheckBox
          key={`pickerItem-${index}`}
          title={item.label.toString()}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={_.isEqual(this.state.tempValue, item.value)}
          onPress={() => { this.handleTempValueChange(item.value); }}
          {...this.props.checkBox}
        />
      ))
    );
  }

  renderModal = visible => (
    <ModalContainer
      visible={visible}
      onCancel={this.handleModalCancel}
      onConfirm={this.handleModalConfirm}
      {...this.props.modal}
    >
      {this.renderItems()}
    </ModalContainer>
  )

  render() {
    const CustomComponent = this.props.component;
    return (
      <CustomComponent
        {...this.props.componentProps}
        style={[this.props.containerStyle]}
        onPress={this.openModal}
      >
        <View style={[this.props.contentContainerStyle]}>
          {this.props.showIcon && this.props.renderIcon()}
          {this.props.renderInputDisplay(this.getDisplayText())}
          {this.renderModal(this.state.modalVisible)}
        </View>
      </CustomComponent>
    );
  }
}

FormPicker.propTypes = propTypes;
FormPicker.defaultProps = defaultProps;

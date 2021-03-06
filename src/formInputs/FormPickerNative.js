import React, { Component } from 'react';
import {
  Picker,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  iconPropTypes,
  inputFieldPropTypes,
  modalPropTypes,
  stylePropTypes,
} from './proptypes';
import ModalContainer from './ModalContainer';

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
  ...modalPropTypes,
  ...iconPropTypes,
};

const defaultProps = {
  items: [
    { label: 'item 1', value: 'item 1 value' },
    { label: 'item 2', value: 'item 2 value' },
  ],
  pickedValue: undefined,
  onValueChange: undefined,
  placeholder: 'Pick...',
};

export default class FormPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedValue: props.pickedValue,
      iosTempValue: this.valueIsEmpty(props.pickedValue) ?
        props.items[0].value : props.pickedValue,
      iosModalVisible: false,
    };
    this.platformIOS = Platform.OS === 'ios';
    this.updateItemsDictionary(props.items);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.items, this.props.items)) {
      this.updateItemsDictionary(nextProps.items);
      this.updateSelectedValue(nextProps.pickedValue);
    }
    if (nextProps.pickedValue && nextProps.pickedValue !== this.props.pickedValue) {
      this.updateSelectedValue(nextProps.pickedValue);
    }
  }

  valueIsEmpty = (value) => {
    if (typeof value === 'number' || typeof value === 'boolean') {
      return false;
    }
    // Note: empty = undefined, null, NaN, ''(empty string)
    return !value;
  }

  updateItemsDictionary = (items) => {
    this.itemsDictionary = {};
    items.forEach((item) => { this.itemsDictionary[item.value] = item.label; });
  }

  updateSelectedValue = (pickedValue) => {
    this.setState({ pickedValue, iosTempValue: pickedValue });
  }

  handleValueChange = () => {
    if (typeof this.props.onValueChange === 'function') {
      this.props.onTouched(); // For the HOC to manage touch state.
      this.props.onValueChange(this.state.pickedValue);
    }
  }

  androidHandleValueChange = (value) => {
    this.setState({ pickedValue: value }, this.handleValueChange);
  }

  iosHandleValueChange = () => {
    this.setState({ pickedValue: this.state.iosTempValue }, this.handleValueChange);
  }

  iosOpenModal = () => { this.setState({ iosModalVisible: true }); }

  iosCloseModal = () => { this.setState({ iosModalVisible: false }); }

  iosHandleModalCancel = () => {
    this.iosCloseModal();
    this.setState({ iosTempValue: this.state.pickedValue });
  }

  iosHandleModalConfirm = () => {
    this.iosCloseModal();
    this.iosHandleValueChange();
  }

  iosHandleTempValueChange = (value) => { this.setState({ iosTempValue: value }); }

  iosRenderModal = visible => (
    <ModalContainer
      visible={visible}
      onCancel={this.iosHandleModalCancel}
      onConfirm={this.iosHandleModalConfirm}
      {...this.props.modal}
    >
      <Picker
        {...this.props}
        pickedValue={this.state.iosTempValue}
        onValueChange={this.iosHandleTempValueChange}
      >
        {this.renderPickerItems()}
      </Picker>
    </ModalContainer>
  )

  iosRenderDisplayText = () => {
    if (this.valueIsEmpty(this.state.pickedValue)) {
      return this.props.placeholder;
    }
    return this.itemsDictionary[this.state.pickedValue];
  }

  iosRenderInputDisplay = () => (
    <Text style={[this.props.inputStyle]}>
      {this.iosRenderDisplayText()}
    </Text>
  )

  iosRenderTouchable = () => (
    <TouchableOpacity
      style={[this.props.containerStyle]}
      onPress={this.iosOpenModal}
    >
      <View style={[this.props.contentContainerStyle]}>
        {this.props.showIcon && this.props.renderIcon()}
        {this.iosRenderInputDisplay()}
        {this.iosRenderModal(this.state.iosModalVisible)}
      </View>
    </TouchableOpacity>
  )

  androidRenderPicker = () => (
    <View style={[this.props.containerStyle]}>
      <View style={[this.props.contentContainerStyle]}>
        {this.props.showIcon && this.props.renderIcon()}
        <Picker
          {...this.props}
          // As of react-native 0.44, there is no propper way to style the text of Android Picker.
          style={[{ flex: 1 }, this.props.inputStyle]}
          pickedValue={this.state.pickedValue}
          onValueChange={this.androidHandleValueChange}
          mode="dialog"
        >
          {this.renderPickerItems()}
        </Picker>
      </View>
    </View>
  )

  renderPickerItems = () => {
    if (this.props.items.length === 0) {
      return (<Picker.Item label="No Options" value={null} />);
    }
    return (
      this.props.items.map(item => (
        <Picker.Item key={`pickerItem-${item.value}`} label={item.label} value={item.value} />
      ))
    );
  }

  renderPicker = () => {
    if (this.platformIOS) {
      return this.iosRenderTouchable();
    }
    return this.androidRenderPicker();
  }

  render() {
    return this.renderPicker();
  }
}

FormPicker.propTypes = propTypes;
FormPicker.defaultProps = defaultProps;

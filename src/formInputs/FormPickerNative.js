import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {
  Component,
} from 'react';
import {
  Picker,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ModalContainer from './ModalContainer';
import {
  iconPropTypes,
  inputFieldPropTypes,
  modalPropTypes,
  stylePropTypes,
} from './proptypes';

const ACCEPT_VALUE_TYPES = [PropTypes.string, PropTypes.number, PropTypes.bool];
const ACCEPT_LABEL_TYPES = [PropTypes.string, PropTypes.number];
const propTypes = {
  selectedValue: PropTypes.oneOfType(ACCEPT_VALUE_TYPES),
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
  selectedValue: undefined,
  onValueChange: undefined,
  placeholder: 'Pick...',
};

export default class FormPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.selectedValue,
      iosTempValue: this.valueIsEmpty(props.selectedValue) ?
        props.items[0].value : props.selectedValue,
      iosModalVisible: false,
    };
    this.platformIOS = Platform.OS === 'ios';
    this.updateItemsDictionary(props.items);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.items, this.props.items)) {
      this.updateItemsDictionary(nextProps.items);
      this.updateSelectedValue(nextProps.selectedValue);
    }
    if (nextProps.selectedValue && nextProps.selectedValue !== this.props.selectedValue) {
      this.updateSelectedValue(nextProps.selectedValue);
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

  updateSelectedValue = (selectedValue) => {
    this.setState({ selectedValue, iosTempValue: selectedValue });
  }

  handleValueChange = () => {
    if (typeof this.props.onValueChange === 'function') {
      this.props.onTouched(); // For the HOC to manage touch state.
      this.props.onValueChange(this.state.selectedValue);
    }
  }

  androidHandleValueChange = (value) => {
    this.setState({ selectedValue: value }, this.handleValueChange);
  }

  iosHandleValueChange = () => {
    this.setState({ selectedValue: this.state.iosTempValue }, this.handleValueChange);
  }

  iosOpenModal = () => { this.setState({ iosModalVisible: true }); }

  iosCloseModal = () => { this.setState({ iosModalVisible: false }); }

  iosHandleModalCancel = () => {
    this.iosCloseModal();
    this.setState({ iosTempValue: this.state.selectedValue });
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
        selectedValue={this.state.iosTempValue}
        onValueChange={this.iosHandleTempValueChange}
      >
        {this.renderPickerItems()}
      </Picker>
    </ModalContainer>
  )

  iosRenderDisplayText = () => {
    if (this.valueIsEmpty(this.state.selectedValue)) {
      return this.props.placeholder;
    }
    return this.itemsDictionary[this.state.selectedValue];
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
          selectedValue={this.state.selectedValue}
          onValueChange={this.androidHandleValueChange}
          mode={'dialog'}
        >
          {this.renderPickerItems()}
        </Picker>
      </View>
    </View>
  )

  renderPickerItems = () => {
    if (this.props.items.length === 0) {
      return (<Picker.Item label={'No Options'} value={null} />);
    }
    return (
      this.props.items.map((item, index) => (
        <Picker.Item key={`pickerItem-${index}`} label={item.label} value={item.value} />
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

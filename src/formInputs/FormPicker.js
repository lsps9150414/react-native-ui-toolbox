import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {
  Component,
} from 'react';
import { CheckBox } from 'react-native-elements';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ModalContainer from './ModalContainer';
import {
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
  onValueChange: PropTypes.func,

  ...stylePropTypes,

  placeholder: PropTypes.string,
};

const defaultProps = {
  items: [
    { label: 'item 1', value: 'item 1 value' },
    { label: 'item 2', value: 'item 2 value' },
  ],
  onValueChange: null,
  placeholder: 'Pick...',
};

export default class FormPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.selectedValue,
      tempValue: this.valueIsEmpty(props.selectedValue) ?
        props.items[0].value : props.selectedValue,
      modalVisible: false,
    };
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
    this.setState({ selectedValue, tempValue: selectedValue });
  }

  handleValueChange = () => {
    this.setState({ selectedValue: this.state.tempValue }, () => {
      if (typeof this.props.onValueChange === 'function') {
        this.props.onTouched(); // For the HOC to manage touch state.
        this.props.onValueChange(this.state.selectedValue);
      }
    });
  }

  openModal = () => { this.setState({ modalVisible: true }); }

  closeModal = () => { this.setState({ modalVisible: false }); }

  handleModalCancel = () => {
    this.closeModal();
    this.setState({ tempValue: this.state.selectedValue });
  }

  handleModalConfirm = () => {
    this.closeModal();
    this.handleValueChange();
  }

  handleTempValueChange = (value) => { this.setState({ tempValue: value }); }

  renderPickerItems = () => {
    if (this.props.items.length === 0) {
      return (<CheckBox title={'No Options'} />);
    }
    return (
      this.props.items.map((item, index) => (
        <CheckBox
          key={`pickerItem-${index}`}
          title={item.label.toString()}
          checkedIcon={'dot-circle-o'}
          uncheckedIcon={'circle-o'}
          checked={_.isEqual(this.state.tempValue, item.value)}
          onPress={() => { this.handleTempValueChange(item.value); }}
        />
      ))
    );
  }

  renderModal = visible => (
    <ModalContainer
      visible={visible}
      onCancel={this.handleModalCancel}
      onConfirm={this.handleModalConfirm}
      cancelBtnText={this.props.modal.cancelBtnText}
      confirmBtnText={this.props.modal.confirmBtnText}
      controlBarHeight={this.props.modal.controlBarHeight}
      modalHeight={this.props.modal.height}
      fullScreen={this.props.modal.fullScreen}
    >
      <ScrollView>{this.renderPickerItems()}</ScrollView>
    </ModalContainer>
  )

  renderDisplayText = () => {
    if (this.valueIsEmpty(this.state.selectedValue)) {
      return this.props.placeholder;
    }
    return this.itemsDictionary[this.state.selectedValue];
  }

  renderInputDisplay = () => (
    <Text style={[this.props.inputStyle]} ellipsizeMode={'tail'} numberOfLines={1}>
      {this.renderDisplayText()}
    </Text>
  )

  render() {
    return (
      <TouchableOpacity
        style={[this.props.containerStyle]}
        onPress={this.openModal}
      >
        <View style={[this.props.contentContainerStyle]}>
          {this.props.showIcon && this.props.renderIcon()}
          {this.renderInputDisplay()}
          {this.renderModal(this.state.modalVisible)}
        </View>
      </TouchableOpacity>
    );
  }
}

FormPicker.propTypes = propTypes;
FormPicker.defaultProps = defaultProps;

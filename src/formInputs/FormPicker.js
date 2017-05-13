import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {
  Component,
} from 'react';
import {
  Picker,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ModalContainer from './ModalContainer';
import baseStyles from './styles';
import { DEFAULT_COLORS } from '../constants/colors';

const acceptValueTypes = [PropTypes.string, PropTypes.number, PropTypes.bool];
const acceptLabelTypes = [PropTypes.string, PropTypes.number];
const propTypes = {
  selectedValue: PropTypes.oneOfType(acceptValueTypes),
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType(acceptValueTypes),
    label: PropTypes.oneOfType(acceptLabelTypes),
  })).isRequired,
  onValueChange: PropTypes.func,

  cancelBtnText: PropTypes.string, /* ios */
  confirmBtnText: PropTypes.string, /* ios */
  controlBarHeight: PropTypes.number, /* ios */
  modalHeight: PropTypes.number, /* ios */
  fullScreen: PropTypes.bool, /* ios */
  placeholder: PropTypes.string,
  containerStyle: View.propTypes.style,
  touchableContainerStyle: View.propTypes.style,
  pickerStyleAndroid: Picker.propTypes.style, /* android */
  inputStyle: Text.propTypes.style,
};

const defaultProps = {
  items: [
    { label: 'item 1', value: 'item 1 value' },
    { label: 'item 2', value: 'item 2 value' },
  ],
  placeholder: 'Select...',
  fullScreen: false,
};

const styles = StyleSheet.create({
  picker: {
    ...Platform.select({
      ios: {
      },
      android: {
        color: DEFAULT_COLORS[3].toHexString(),
      },
    }),
  },
});

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
    // Empty: undefined, null, NaN, ''(empty string)
    return !value;
  }
  updateItemsDictionary = (items) => {
    this.itemsDictionary = {};
    items.forEach((item) => { this.itemsDictionary[item.value] = item.label; });
  }
  updateSelectedValue = (selectedValue) => {
    this.setState({ selectedValue, iosTempValue: selectedValue });
  }
  androidHandleValueChange = (value) => {
    this.setState({ selectedValue: value },
      () => {
        if (typeof this.props.onValueChange === 'function') {
          this.props.onValueChange(this.state.selectedValue);
        }
      });
  }
  iosHandleValueChange = () => {
    this.setState({ selectedValue: this.state.iosTempValue },
      () => {
        if (typeof this.props.onValueChange === 'function') {
          this.props.onValueChange(this.state.selectedValue);
        }
      });
  }
  androidRenderPicker = () => (
    <Picker
      {...this.props}
      style={[this.props.pickerStyleAndroid]}
      selectedValue={this.state.selectedValue}
      onValueChange={this.androidHandleValueChange}
      mode={'dialog'}
    >
      {this.renderPickerItems()}
    </Picker>
  )

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
  iosRenderPicker = () => (
    <Picker
      {...this.props}
      selectedValue={this.state.iosTempValue}
      onValueChange={this.iosHandleTempValueChange}
    >
      {this.renderPickerItems()}
    </Picker>
  )
  iosRenderModal = () => (
    <ModalContainer
      cancelBtnText={this.props.cancelBtnText}
      confirmBtnText={this.props.confirmBtnText}
      onCancel={this.iosHandleModalCancel}
      onConfirm={this.iosHandleModalConfirm}
      visible={this.state.iosModalVisible}
      controlBarHeight={this.props.controlBarHeight}
      modalHeight={this.props.modalHeight}
      fullScreen={this.props.fullScreen}
    >
      {this.iosRenderPicker()}
    </ModalContainer>
  )
  iosRenderTouchable = () => (
    <TouchableOpacity
      style={[baseStyles.innerContainer, this.props.touchableContainerStyle]}
      onPress={this.iosOpenModal}
    >
      <Text style={[styles.text, this.props.inputStyle]}>
        {this.valueIsEmpty(this.state.selectedValue) && this.props.placeholder}
        {!this.valueIsEmpty(this.state.selectedValue) &&
          this.itemsDictionary[this.state.selectedValue]
        }
      </Text>
      {this.iosRenderModal()}
    </TouchableOpacity>
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

  render() {
    return (
      <View
        style={[baseStyles.container, this.props.containerStyle]}
      >
        {this.platformIOS && this.iosRenderTouchable()}
        {!this.platformIOS && this.androidRenderPicker()}
      </View>
    );
  }

}

FormPicker.propTypes = propTypes;
FormPicker.defaultProps = defaultProps;

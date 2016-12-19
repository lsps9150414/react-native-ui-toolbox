import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Modal,
  Picker,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ModalContainer from './ModalContainer';
import { DEFAULT_COLORS } from '../constants/colors';
import { fieldContainer, innerContainer } from './styles';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
  onValueChange: PropTypes.func,

  cancelBtnText: PropTypes.string, /* ios */
  confirmBtnText: PropTypes.string, /* ios */
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
};

const styles = StyleSheet.create({
  container: {
    ...fieldContainer,
  },
  innerContainer: {
    ...innerContainer,
  },
  pickerStyleAndroid: {
    color: DEFAULT_COLORS[3].toHexString(),
  },
});

export default class FormPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.items[0].value,
      iosTempValue: props.items[0].value,
      iosModalVisible: false,
    };
    this.platformIOS = Platform.OS === 'ios';
    this.updateItemsDictionary(props.items);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.updateItemsDictionary(nextProps.items);
    }
  }
  updateItemsDictionary = (items) => {
    this.itemsDictionary = {};
    items.forEach((item) => { this.itemsDictionary[item.value] = item.label; });
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
      style={[styles.pickerStyleAndroid, this.props.pickerStyleAndroid]}
      selectedValue={this.state.selectedValue}
      onValueChange={this.androidHandleValueChange}
      prompt={'propmt'}
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
      renderContent={this.iosRenderPicker}
      visible={this.state.iosModalVisible}
    />
  )
  iosRenderTouchable = () => (
    <TouchableOpacity
      style={[styles.innerContainer, this.props.touchableContainerStyle]}
      onPress={this.iosOpenModal}
    >
      <Text style={[styles.text, this.props.inputStyle]}>
        {this.itemsDictionary[this.state.selectedValue]}
      </Text>
      {this.iosRenderModal()}
    </TouchableOpacity>
  )
  renderPickerItems = () => (
    this.props.items.map((item, index) => (
      <Picker.Item key={`pickerItem-${index}`} label={item.label} value={item.value} />
    ))
  )

  render() {
    return (
      <View
        style={[styles.container, this.props.containerStyle]}
      >
        {this.platformIOS && this.iosRenderTouchable()}
        {!this.platformIOS && this.androidRenderPicker()}
      </View>
    );
  }

}

FormPicker.propTypes = propTypes;
FormPicker.defaultProps = defaultProps;

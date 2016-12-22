import _ from 'lodash';
import React, {
  Component,
  PropTypes,
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
import { DEFAULT_COLORS } from '../constants/colors';
import { fieldContainer, innerContainer } from './styles';

const propTypes = {
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
  onValueChange: PropTypes.func,

  cancelBtnText: PropTypes.string, /* ios */
  confirmBtnText: PropTypes.string, /* ios */
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
};

const styles = StyleSheet.create({
  container: {
    ...fieldContainer,
  },
  innerContainer: {
    ...innerContainer,
  },
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
      iosTempValue: props.selectedValue || props.items[0].value,
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
      style={[styles.picker, this.props.pickerStyleAndroid]}
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
      style={styles.picker}
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
        {!this.state.selectedValue && this.props.placeholder}
        {this.state.selectedValue && this.itemsDictionary[this.state.selectedValue]}
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

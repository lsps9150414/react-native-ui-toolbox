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

import { CheckBox } from 'react-native-elements';
import ModalContainer from './ModalContainer';
import { DEFAULT_COLORS } from '../constants/colors';
import { fieldContainer, innerContainer } from './styles';

const propTypes = {
  selectedValues: PropTypes.arrayOf([PropTypes.string, PropTypes.number, PropTypes.bool]),
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  })).isRequired,
  onValueChange: PropTypes.func,

  cancelBtnText: PropTypes.string, /* ios */
  confirmBtnText: PropTypes.string, /* ios */
  controlBarHeight: PropTypes.number, /* ios */
  modalHeight: PropTypes.number, /* ios */
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

export default class FormSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: props.selectedValues,
      tempValues: this.valueIsEmpty(props.selectedValues) ?
        props.items[0].value : props.selectedValues,
      modalVisible: false,
    };
    this.platformIOS = Platform.OS === 'ios';
    this.updateItemsDictionary(props.items);
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.items, this.props.items)) {
      this.updateItemsDictionary(nextProps.items);
      this.updateSelectedValue(nextProps.selectedValues);
    }
    if (nextProps.selectedValues && nextProps.selectedValues !== this.props.selectedValues) {
      this.updateSelectedValue(nextProps.selectedValues);
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

  updateSelectedValue = (selectedValues) => {
    this.setState({ selectedValues, tempValues: selectedValues });
  }

  handleValueChange = () => {
    this.setState({ selectedValues: this.state.tempValues },
      () => {
        if (typeof this.props.onValueChange === 'function') {
          this.props.onValueChange(this.state.selectedValues);
        }
      });
  }

  openModal = () => { this.setState({ modalVisible: true }); }
  closeModal = () => { this.setState({ modalVisible: false }); }
  handleModalCancel = () => {
    this.closeModal();
    this.setState({ tempValues: this.state.selectedValues });
  }
  handleModalConfirm = () => {
    this.closeModal();
    this.handleValueChange();
  }
  handleTempValueChange = (value) => { this.setState({ tempValues: value }); }

  renderCheckboxes = () => (
    <View>
      <CheckBox
        title={'Click Here'}
        checked={false}
      />
      <CheckBox
        title={'Click Here'}
        checked={true}
      />
    </View>
  )
  renderModal = () => (
    <ModalContainer
      cancelBtnText={this.props.cancelBtnText}
      confirmBtnText={this.props.confirmBtnText}
      onCancel={this.handleModalCancel}
      onConfirm={this.handleModalConfirm}
      renderContent={this.renderCheckboxes}
      visible={this.state.modalVisible}
      fullScreen
    />
  )
  renderTouchable = () => (
    <TouchableOpacity
      style={[styles.innerContainer, this.props.touchableContainerStyle]}
      onPress={this.openModal}
    >
      <Text style={[styles.text, this.props.inputStyle]}>
        {this.valueIsEmpty(this.state.selectedValues) && this.props.placeholder}
        {!this.valueIsEmpty(this.state.selectedValues) &&
          this.itemsDictionary[this.state.selectedValues]
        }
      </Text>
      {this.renderModal()}
    </TouchableOpacity>
  )
  renderCheckboxesItems = () => {
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
        {this.renderTouchable()}
      </View>
    );
  }

}

FormSelect.propTypes = propTypes;
FormSelect.defaultProps = defaultProps;

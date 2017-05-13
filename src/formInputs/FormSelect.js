import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {
  Component,
} from 'react';
import { CheckBox } from 'react-native-elements';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ModalContainer from './ModalContainer';
import { DEFAULT_COLORS } from '../constants/colors';
import { fieldContainer, innerContainer } from './styles';

const acceptValueTypes = [PropTypes.string, PropTypes.number, PropTypes.bool];
const acceptLabelTypes = [PropTypes.string, PropTypes.number];
const propTypes = {
  selectedValues: PropTypes.arrayOf(PropTypes.oneOfType(acceptValueTypes)),
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType(acceptValueTypes),
    label: PropTypes.oneOfType(acceptLabelTypes),
  })).isRequired,
  onValueChange: PropTypes.func,

  cancelBtnText: PropTypes.string, /* ios */
  confirmBtnText: PropTypes.string, /* ios */
  controlBarHeight: PropTypes.number,
  modalHeight: PropTypes.number,
  fullScreen: PropTypes.bool,
  placeholder: PropTypes.string,
  containerStyle: View.propTypes.style,
  touchableContainerStyle: View.propTypes.style,
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
  container: {
    ...fieldContainer,
  },
  innerContainer: {
    ...innerContainer,
  },
  text: {
  },
});

export default class FormSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: props.selectedValues,
      tempValues: props.selectedValues,
      modalVisible: false,
    };
    this.platformIOS = Platform.OS === 'ios';
    this.updateItemsDictionary(props.items);
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.items, this.props.items)) {
      this.updateItemsDictionary(nextProps.items);
      this.updateSelectedValues(nextProps.selectedValues);
    }
    if (nextProps.selectedValues && nextProps.selectedValues !== this.props.selectedValues) {
      this.updateSelectedValues(nextProps.selectedValues);
    }
  }

  noneSelected = selectedValues => _.isEmpty(selectedValues)
  isSelected = (selectedValues, value) => _.includes(selectedValues, value)

  updateItemsDictionary = (items) => {
    this.itemsDictionary = {};
    items.forEach((item) => { this.itemsDictionary[item.value] = item.label; });
  }
  updateSelectedValues = (selectedValues) => {
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
  handleTempValueChange = (value) => {
    const newTempValues = [...this.state.tempValues];
    if (newTempValues.indexOf(value) === -1) {
      newTempValues.push(value);
    } else {
      _.remove(newTempValues, n => (n === value));
    }
    this.setState({ tempValues: newTempValues });
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

  renderCheckboxItems = () => {
    if (this.props.items.length === 0) {
      return (<CheckBox title={'No Options'} />);
    }
    return (
      this.props.items.map((item, index) => (
        <CheckBox
          key={`pickerItem-${index}`}
          title={item.label.toString()}
          checked={this.isSelected(this.state.tempValues, item.value)}
          onPress={() => { this.handleTempValueChange(item.value); }}
        />
      ))
    );
  }
  renderModal = () => (
    <ModalContainer
      cancelBtnText={this.props.cancelBtnText}
      confirmBtnText={this.props.confirmBtnText}
      onCancel={this.handleModalCancel}
      onConfirm={this.handleModalConfirm}
      visible={this.state.modalVisible}
      controlBarHeight={this.props.controlBarHeight}
      modalHeight={this.props.modalHeight}
      fullScreen={this.props.fullScreen}
    >
      <ScrollView>{this.renderCheckboxItems()}</ScrollView>
    </ModalContainer>
  )
  renderSelectedValues = selectedValues => (
    selectedValues.map((item, index) => {
      let seperator = '';
      if ((index + 1) !== selectedValues.length) {
        seperator = ', ';
      }
      return (`${this.itemsDictionary[item]}${seperator}`);
    })
  )
  renderTouchable = () => (
    <TouchableOpacity
      style={[styles.innerContainer, this.props.touchableContainerStyle]}
      onPress={this.openModal}
    >
      <Text style={[styles.text, this.props.inputStyle]} ellipsizeMode={'tail'} numberOfLines={1}>
        {this.noneSelected(this.state.selectedValues) && this.props.placeholder}
        {!this.noneSelected(this.state.selectedValues) &&
          this.renderSelectedValues(this.state.selectedValues)
        }
      </Text>
      {this.renderModal()}
    </TouchableOpacity>
  )

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

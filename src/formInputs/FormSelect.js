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
  iconPropTypes,
  inputFieldPropTypes,
  modalPropTypes,
  stylePropTypes,
} from './proptypes';

const ACCEPT_VALUE_TYPES = [PropTypes.string, PropTypes.number, PropTypes.bool];
const ACCEPT_LABEL_TYPES = [PropTypes.string, PropTypes.number];
const propTypes = {
  selectedValues: PropTypes.arrayOf(PropTypes.oneOfType(ACCEPT_VALUE_TYPES)),
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
  selectedValues: undefined,
  onValueChange: undefined,
  placeholder: 'Select...',
};

export default class FormSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: props.selectedValues,
      tempValues: props.selectedValues,
      modalVisible: false,
    };
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
    this.setState({ selectedValues: this.state.tempValues }, () => {
      if (typeof this.props.onValueChange === 'function') {
        this.props.onTouched(); // For the HOC to manage touch state.
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

  handleTempValueChange = (value) => {
    const newTempValues = [...this.state.tempValues];
    if (newTempValues.indexOf(value) === -1) {
      newTempValues.push(value);
    } else {
      _.remove(newTempValues, n => (n === value));
    }
    this.setState({ tempValues: newTempValues });
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
      <ScrollView>{this.renderCheckboxItems()}</ScrollView>
    </ModalContainer>
  )

  renderDisplayText = () => {
    if (this.noneSelected(this.state.selectedValues)) {
      return this.props.placeholder;
    }
    return (
      this.state.selectedValues.map((item, index) => {
        let seperator = '';
        if ((index + 1) !== this.state.selectedValues.length) {
          seperator = ', ';
        }
        return (`${this.itemsDictionary[item]}${seperator}`);
      })
    );
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

FormSelect.propTypes = propTypes;
FormSelect.defaultProps = defaultProps;

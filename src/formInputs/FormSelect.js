import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {
  Component,
} from 'react';
import { CheckBox } from 'react-native-elements';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';

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
  selectedValues: PropTypes.arrayOf(PropTypes.oneOfType(ACCEPT_VALUE_TYPES)),
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
  selectedValues: [],
  placeholder: 'Select...',
  ...defaultInputFieldProps,
};

export default class FormSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: this.getValidSelectedValues(props.selectedValues),
      tempValues: this.getValidSelectedValues(props.selectedValues),
      modalVisible: false,
    };
    this.updateItemsDictionary(props.items);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.items, this.props.items)) {
      this.updateItemsDictionary(nextProps.items);
    }
    if (!_.isEqual(nextProps.selectedValues, this.props.selectedValues)) {
      this.updateSelectedValues(nextProps.selectedValues);
    }
  }

  getValidSelectedValues = selectedValues => (_.isArray(selectedValues) ? selectedValues : [])

  valueIsEmpty = (selectedValues) => {
    const filteredValues = _.filter(selectedValues, value => (value !== undefined));
    return _.isEmpty(filteredValues);
  }

  updateItemsDictionary = (items) => {
    this.itemsDictionary = {};
    items.forEach((item) => { this.itemsDictionary[item.value] = item.label; });
  }

  updateSelectedValues = (selectedValues) => {
    const validSelectedValuesProp = this.getValidSelectedValues(selectedValues);
    this.setState({ selectedValues: validSelectedValuesProp, tempValues: validSelectedValuesProp });
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
    if (_.includes(newTempValues, value)) {
      _.pull(newTempValues, value);
    } else {
      newTempValues.push(value);
    }
    this.setState({ tempValues: newTempValues });
  }

  renderItems = () => {
    if (this.props.items.length === 0) {
      return (<CheckBox title={'No Options'} />);
    }
    return (
      this.props.items.map(item => (
        <CheckBox
          key={item.value}
          title={item.label.toString()}
          checked={_.includes(this.state.tempValues, item.value)}
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

  getDisplayText = () => {
    if (this.valueIsEmpty(this.state.selectedValues)) {
      return this.props.placeholder;
    }
    const itemValueOrder = this.props.items.map(item => (item.value));
    const sortedSelectedValues = _.sortBy(this.state.selectedValues, item => (
      itemValueOrder.indexOf(item)
    ));

    const displayArray = sortedSelectedValues
      .filter(value => value !== undefined)
      .map(value => this.itemsDictionary[value]);

    return _.join(displayArray, ', ');
  }

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

FormSelect.propTypes = propTypes;
FormSelect.defaultProps = defaultProps;

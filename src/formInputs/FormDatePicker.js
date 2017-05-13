import 'moment/min/locales';

import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import React, {
  Component,
} from 'react';
import {
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ModalContainer from './ModalContainer';
import baseStyles from './styles';

const propTypes = {
  date: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onValueChange: PropTypes.func,

  cancelBtnText: PropTypes.string, /* ios */
  confirmBtnText: PropTypes.string, /* ios */
  placeholder: PropTypes.string,
  containerStyle: View.propTypes.style,
  touchableContainerStyle: View.propTypes.style,
  inputStyle: Text.propTypes.style,

  format: PropTypes.string,
  locale: PropTypes.string,
};

const defaultProps = {
  format: 'Y-M-D (dd)',
  locale: 'en',
  placeholder: 'Select a date...',
};

export default class FormDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      momentDate: props.date ? moment(props.date) : null,
      iosTempDate: props.date || new Date(),
      iosModalVisible: false,
    };
    this.platformIOS = Platform.OS === 'ios';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date && !_.isEqual(nextProps.date, this.state.date)) {
      this.updateDate(nextProps.date);
    }
  }

  updateDate = (date) => {
    this.setState({ momentDate: moment(date), iosTempDate: date });
  }

  handleDateChange = () => {
    if (typeof this.props.onValueChange === 'function') {
      this.props.onValueChange(this.state.momentDate.toDate());
    }
  }

  openPicker = () => {
    if (Platform.OS === 'ios') {
      this.iosOpenModal();
    } else {
      this.androidShowPicker();
    }
  }

  androidShowPicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.state.momentDate ? this.state.momentDate.toDate() : new Date(),
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
      });
      if (action === DatePickerAndroid.dateSetAction) {
        this.setState({ momentDate: moment(new Date(year, month, day)) }, this.handleDateChange);
      }
    } catch ({ code, message }) {
      console.warn('Error');
    }
  }

  iosOpenModal = () => { this.setState({ iosModalVisible: true }); }

  iosCloseModal = () => { this.setState({ iosModalVisible: false }); }

  iosHandleModalCancel = () => {
    this.iosCloseModal();
    if (this.state.momentDate) {
      this.setState({ iosTempDate: this.state.momentDate.toDate() });
    }
  }

  iosHandleModalConfirm = () => {
    this.iosCloseModal();
    this.setState({ momentDate: moment(this.state.iosTempDate) }, this.handleDateChange);
  }

  iosHandleTempDateChange = (date) => { this.setState({ iosTempDate: date }); }

  iosRenderDatePicker = () => (
    <DatePickerIOS
      mode={'date'}
      date={this.state.iosTempDate}
      onDateChange={this.iosHandleTempDateChange}
      minimumDate={this.props.minDate}
      maximumDate={this.props.maxDate}
    />
  );

  iosRenderModal = () => (
    <ModalContainer
      cancelBtnText={this.props.cancelBtnText}
      confirmBtnText={this.props.confirmBtnText}
      onCancel={this.iosHandleModalCancel}
      onConfirm={this.iosHandleModalConfirm}
      visible={this.state.iosModalVisible}
    >
      {this.iosRenderDatePicker()}
    </ModalContainer>
  )

  render() {
    let display;
    if (this.state.momentDate) {
      this.state.momentDate.locale(this.props.locale);
      display = this.state.momentDate.format(this.props.format);
    } else {
      display = this.props.placeholder;
    }
    return (
      <View style={[baseStyles.container, this.props.containerStyle]}>
        <TouchableOpacity
          style={[baseStyles.innerContainer, this.props.touchableContainerStyle]}
          onPress={this.openPicker}
        >
          <Text style={[this.props.inputStyle]}>
            {display}
          </Text>
        </TouchableOpacity>
        {this.platformIOS && this.iosRenderModal()}
      </View>
    );
  }
}

FormDatePicker.propTypes = propTypes;
FormDatePicker.defaultProps = defaultProps;

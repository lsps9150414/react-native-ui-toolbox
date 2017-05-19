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
  TimePickerAndroid,
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

const ACCEPT_MODE_TYPES = ['date', 'time', 'datetime'];
const propTypes = {
  mode: PropTypes.oneOf(ACCEPT_MODE_TYPES),
  date: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  locale: PropTypes.string,
  ...inputFieldPropTypes,
  ...stylePropTypes,
  ...modalPropTypes,
  ...iconPropTypes,
};

const defaultProps = {
  date: undefined,
  maxDate: undefined, // DatePickerAndroid don't take null.
  minDate: undefined, // DatePickerAndroid don't take null.
  dateFormat: 'Y-M-D (dd)',
  timeFormat: 'hh:mm A',
  locale: 'en',
  placeholder: 'Select a date...',
  ...defaultInputFieldProps,
};

export default class FormDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.getValidDateProp(props.date),
      iosTempDate: this.getValidDateProp(props.date),
      iosModalVisible: false,
    };
    this.platformIOS = Platform.OS === 'ios';
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.date, this.props.date)) {
      this.updateDateState(nextProps.date);
    }
  }

  /*
  NOTE: Date prop accept instance of Date or null.
  Any other datatype will be deemed as null.
  */
  getValidDateProp = date => (_.isDate(date) ? date : null)

  getValidDate = date => (_.isDate(date) ? date : new Date())

  valueIsEmpty = date => (!_.isDate(date))

  updateDateState = (date) => {
    const validDateProp = this.getValidDateProp(date);
    this.setState({ date: validDateProp, iosTempDate: validDateProp });
  }

  handleValueChange = (newDate) => {
    this.setState({ date: newDate }, () => {
      if (typeof this.props.onValueChange === 'function') {
        this.props.onTouched(); // For the HOC to manage touch state.
        this.props.onValueChange(newDate);
      }
    });
  }

  openPicker = () => {
    if (Platform.OS === 'ios') {
      this.iosShowModal();
    } else {
      this.androidShowPicker();
    }
  }

  androidShowPicker = async () => {
    if (this.props.mode === ACCEPT_MODE_TYPES[0]) {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date: this.getValidDate(this.state.date),
          minDate: this.props.minDate,
          maxDate: this.props.maxDate,
        });
        if (action === DatePickerAndroid.dateSetAction) {
          this.handleValueChange(new Date(year, month, day));
        }
      } catch ({ message }) {
        console.warn('Cannot open date picker:', message); // eslint-disable-line no-console
      }
    } else {
      try {
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: moment(this.getValidDate(this.state.date)).hour(),
          minute: moment(this.getValidDate(this.state.date)).minute(),
          is24Hour: false,
        });
        if (action === TimePickerAndroid.timeSetAction) {
          this.handleValueChange(moment().set({ hour, minute, second: 0 }).toDate());
        }
      } catch ({ message }) {
        console.warn('Cannot open time picker', message); // eslint-disable-line no-console
      }
    }
  }

  iosShowModal = () => { this.setState({ iosModalVisible: true }); }

  iosCloseModal = () => { this.setState({ iosModalVisible: false }); }

  iosHandleCancel = () => {
    this.iosCloseModal();
    this.setState({ iosTempDate: this.state.date });
  }

  iosHandleConfirm = () => {
    this.iosCloseModal();
    this.handleValueChange(this.getValidDate(this.state.iosTempDate));
  }

  iosHandleTempDateChange = (date) => { this.setState({ iosTempDate: date }); }

  iosRenderModal = visible => (
    <ModalContainer
      visible={visible}
      onCancel={this.iosHandleCancel}
      onConfirm={this.iosHandleConfirm}
      {...this.props.modal}
    >
      <DatePickerIOS
        mode={this.props.mode}
        date={this.getValidDate(this.state.iosTempDate)}
        onDateChange={this.iosHandleTempDateChange}
        minimumDate={this.props.minDate}
        maximumDate={this.props.maxDate}
      />
    </ModalContainer>
  )

  renderDisplayText = (mode) => {
    if (this.valueIsEmpty(this.state.date)) {
      return this.props.placeholder;
    }
    if (mode === ACCEPT_MODE_TYPES[0]) {
      return (
        moment(this.getValidDate(this.state.date))
          .locale(this.props.locale)
          .format(this.props.dateFormat)
      );
    }
    return (
      moment(this.getValidDate(this.state.date))
        .locale(this.props.locale)
        .format(this.props.timeFormat)
    );
  }

  renderInputDisplay = () => (
    <Text style={[this.props.inputStyle]}>
      {this.renderDisplayText(this.props.mode)}
    </Text>
  )

  render() {
    const CustomComponent = this.props.component;
    return (
      <CustomComponent
        {...this.props.componentProps}
        style={[this.props.containerStyle]}
        onPress={this.openPicker}
      >
        <View style={[this.props.contentContainerStyle]}>
          {this.props.showIcon && this.props.renderIcon()}
          {this.renderInputDisplay()}
          {this.platformIOS && this.iosRenderModal(this.state.iosModalVisible)}
        </View>
      </CustomComponent>
    );
  }
}

FormDatePicker.propTypes = propTypes;
FormDatePicker.defaultProps = defaultProps;

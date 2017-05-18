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
      // internalDate is only used when date prop is not provided.
      internalDate: props.date instanceof Date ? props.date : null,
      iosTempDate: this.getValidDate(props.date),
      iosModalVisible: false,
    };
    this.platformIOS = Platform.OS === 'ios';
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.date, this.props.date)) {
      this.updateDateState(this.getValidDate(nextProps.date));
    }
  }

  getValidDate = date => (_.isDate(date) ? date : new Date())

  /*
  If props.date is not provided use state.internalDate.
  When state.internalDate is not yet init, use today.
  */
  getDateInUse = () => {
    if (this.props.date instanceof Date) {
      return this.props.date;
    } else if (this.state.internalDate instanceof Date) {
      return this.state.internalDate;
    }
    return new Date();
  }

  updateDateState = (date) => {
    this.setState({ internalDate: date, iosTempDate: date });
  }

  handleValueChange = (newDate) => {
    this.setState({ internalDate: newDate }, () => {
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
          date: this.getDateInUse(),
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
          hour: moment(this.getDateInUse()).hour(),
          minute: moment(this.getDateInUse()).minute(),
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
    this.setState({ iosTempDate: this.getDateInUse() });
  }

  iosHandleConfirm = () => {
    this.iosCloseModal();
    this.handleValueChange(this.state.iosTempDate);
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
        date={this.state.iosTempDate}
        onDateChange={this.iosHandleTempDateChange}
        minimumDate={this.props.minDate}
        maximumDate={this.props.maxDate}
      />
    </ModalContainer>
  )

  renderDisplayText = (mode) => {
    if (!(this.props.date instanceof Date) && !(this.state.internalDate instanceof Date)) {
      return this.props.placeholder;
    }
    if (mode === ACCEPT_MODE_TYPES[0]) {
      return moment(this.getDateInUse()).locale(this.props.locale).format(this.props.dateFormat);
    }
    return moment(this.getDateInUse()).locale(this.props.locale).format(this.props.timeFormat);
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

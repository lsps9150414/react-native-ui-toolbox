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

  // TODO: Share these props
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
  date: null,
  maxDate: undefined, // DatePickerAndroid don't take null.
  minDate: undefined, // DatePickerAndroid don't take null.
  onValueChange: null,
  format: 'Y-M-D (dd)',
  locale: 'en',
  placeholder: 'Select a date...',
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
      this.updateDateState(nextProps.date);
    }
  }

  getValidDate = date => (date instanceof Date ? date : new Date())

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
    this.setState({ internalDate: date, iosTempDate: this.getValidDate(date) });
  }

  handleDateChange = (newDate) => {
    this.setState({ internalDate: newDate }, () => {
      if (typeof this.props.onValueChange === 'function') {
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
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.getDateInUse(),
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
      });
      if (action === DatePickerAndroid.dateSetAction) {
        this.handleDateChange(new Date(year, month, day));
      }
    } catch ({ message }) {
      console.warn('Error:', message);
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
    this.handleDateChange(this.state.iosTempDate);
  }

  iosHandleTempDateChange = (date) => { this.setState({ iosTempDate: date }); }

  iosRenderModal = visible => (
    <ModalContainer
      cancelBtnText={this.props.cancelBtnText}
      confirmBtnText={this.props.confirmBtnText}
      onCancel={this.iosHandleCancel}
      onConfirm={this.iosHandleConfirm}
      visible={visible}
    >
      <DatePickerIOS
        mode={'date'}
        date={this.state.iosTempDate}
        onDateChange={this.iosHandleTempDateChange}
        minimumDate={this.props.minDate}
        maximumDate={this.props.maxDate}
      />
    </ModalContainer>
  )

  renderDisplayText = () => {
    if (!(this.props.date instanceof Date) && !(this.state.internalDate instanceof Date)) {
      return this.props.placeholder;
    }
    return moment(this.getDateInUse()).locale(this.props.locale).format(this.props.format);
  }

  render() {
    return (
      <View style={[baseStyles.container, this.props.containerStyle]}>
        <TouchableOpacity
          style={[baseStyles.innerContainer, this.props.touchableContainerStyle]}
          onPress={this.openPicker}
        >
          <Text style={[this.props.inputStyle]}>
            {this.renderDisplayText()}
          </Text>
        </TouchableOpacity>
        {this.platformIOS && this.iosRenderModal(this.state.iosModalVisible)}
      </View>
    );
  }
}

FormDatePicker.propTypes = propTypes;
FormDatePicker.defaultProps = defaultProps;

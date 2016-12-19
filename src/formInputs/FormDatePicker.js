import 'moment/min/locales';

import moment from 'moment';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Animated,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ModalContainer from './ModalContainer';
import { fieldContainer, innerContainer } from './styles';

const propTypes = {
  date: PropTypes.object,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  onDateChange: PropTypes.func,

  cancelBtnText: PropTypes.string, /* ios */
  confirmBtnText: PropTypes.string, /* ios */
  containerStyle: View.propTypes.style,
  touchableContainerStyle: View.propTypes.style,
  inputStyle: Text.propTypes.style,

  format: PropTypes.string,
  locale: PropTypes.string,
};

const defaultProps = {
  date: new Date(),
  format: 'Y-M-D (dd)',
  locale: 'en',
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
  datePicker: {
  },
});

export default class FormDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      momentDate: moment(props.date),
      iosTempDate: props.date,
      iosModalVisible: false,
    };
    this.platformIOS = Platform.OS === 'ios';
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.date && nextProps.date !== this.state.date) {
      this.updateDate(nextProps.date);
    }
  }

  updateDate = (date) => {
    this.setState({ momentDate: moment(date), iosTempDate: date });
  }

  handleDateChange = () => {
    if (typeof this.props.onDateChange === 'function') {
      this.props.onDateChange(this.state.momentDate.toDate());
    }
  }
  openPicker = () => {
    if (Platform.OS === 'ios') { this.iosOpenModal(); } else { this.androidShowPicker(); }
  }
  androidShowPicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.state.momentDate.toDate(),
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
    this.setState({ iosTempDate: this.state.momentDate.toDate() });
  }
  iosHandleModalConfirm = () => {
    this.iosCloseModal();
    this.setState({ momentDate: moment(this.state.iosTempDate) }, this.handleDateChange);
  }
  iosHandleTempDateChange = (date) => { this.setState({ iosTempDate: date }); }
  iosRenderDatePicker = () => (
    <DatePickerIOS
      style={styles.datePicker}
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
      renderContent={this.iosRenderDatePicker}
      visible={this.state.iosModalVisible}
    />
  )

  render() {
    this.state.momentDate.locale(this.props.locale);
    return (
      <View
        style={[styles.container, this.props.containerStyle]}
      >
        <TouchableOpacity
          style={[styles.innerContainer, this.props.touchableContainerStyle]}
          onPress={this.openPicker}
        >
          <Text style={[styles.text, this.props.inputStyle]}>
            {this.state.momentDate.format(this.props.format)}
          </Text>
        </TouchableOpacity>
        {this.platformIOS && this.iosRenderModal()}
      </View>
    );
  }

}

FormDatePicker.propTypes = propTypes;
FormDatePicker.defaultProps = defaultProps;

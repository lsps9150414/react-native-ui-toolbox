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
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { DEFAULT_COLORS } from '../constants/colors';
import { fieldContainer } from './styles';

const MODAL_CONTROL_BAR_HEIGHT = 50;
const MODAL_CONTENT_HEIGHT = MODAL_CONTROL_BAR_HEIGHT + 220;
const MODAL_ANIMATION_CONFIG = {
  toValue: MODAL_CONTENT_HEIGHT,
  duration: 300,
};

const propTypes = {
  cancelBtnText: PropTypes.string, /* ios */
  confirmBtnText: PropTypes.string, /* ios */
  containerStyle: View.propTypes.style,
  touchableContainerStyle: View.propTypes.style,
  date: PropTypes.object,
  format: PropTypes.string,
  inputStyle: Text.propTypes.style,
  locale: PropTypes.string,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  onDateChange: PropTypes.func.isRequired,
};

const defaultProps = {
  date: new Date(),
  format: 'Y-M-D (dd)',
  locale: 'en',
  onDateChange: () => { console.warn('Please provide onDateChange.'); },
};

const styles = StyleSheet.create({
  container: {
    ...fieldContainer,
  },
  touchableContainer: {
    flex: 1,
    justifyContent: 'center',
    ...Platform.select({
      android: {
        paddingHorizontal: 4,
      },
    }),
  },
  text: {
    ...Platform.select({
      ios: {
        fontSize: 16,
      },
    }),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContentContainer: {
    backgroundColor: '#fff',
    height: MODAL_CONTENT_HEIGHT,
  },
  controlBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    height: MODAL_CONTROL_BAR_HEIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  controlButton: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  controlButtonText: {
  },
  datePicker: {
  },
});

export default class FormDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      momentDate: moment(props.date),
      tempDate: props.date,
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
    };
    this.platformIOS = Platform.OS === 'ios';
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.date && nextProps.date !== this.state.date) {
      this.setState({ momentDate: moment(nextProps.date), tempDate: nextProps.date });
    }
  }

  openPicker = () => {
    if (Platform.OS === 'ios') { this.iosOpenModal(); } else { this.androidShowPicker(); }
  }
  androidShowPicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.props.date,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
      });
      if (action === DatePickerAndroid.dateSetAction) {
        this.setState({ momentDate: moment(new Date(year, month, day)) });
      }
    } catch ({ code, message }) {
      console.warn('Error');
    }
  }
  iosOpenModal = () => {
    this.setState({ modalVisible: true });
    Animated.timing(this.state.animatedHeight, MODAL_ANIMATION_CONFIG).start();
  }
  iosCloseIOSModal = () => {
    this.setState({ modalVisible: false, animatedHeight: new Animated.Value(0) });
  }

  iosCancel = () => {
    this.iosCloseIOSModal();
    this.setState({ tempDate: this.state.momentDate.toDate() });
  }
  iosConfirm = () => {
    this.iosCloseIOSModal();
    this.setState({ momentDate: moment(this.state.tempDate) },
      () => { this.props.onDateChange(this.state.momentDate.toDate()); });
  }

  iosRenderCancelButton = () => (
    <TouchableOpacity
      style={[styles.controlButton]}
      onPress={this.iosCancel}
    >
      <Text
        style={[
          styles.controlButtonText,
          { color: 'red' },
        ]}
      >
        {Boolean(this.props.cancelBtnText) && this.props.cancelBtnText}
        {!this.props.cancelBtnText && 'Cancel'}
      </Text>
    </TouchableOpacity>
  )
  iosRenderConfirmButton = () => (
    <TouchableOpacity
      style={[styles.controlButton]}
      onPress={this.iosConfirm}
    >
      <Text
        style={[
          styles.controlButtonText,
          { color: DEFAULT_COLORS[3].toHexString(), fontWeight: 'bold' },
        ]}
      >
        {Boolean(this.props.confirmBtnText) && this.props.confirmBtnText}
        {!this.props.confirmBtnText && 'Confirm'}
      </Text>
    </TouchableOpacity>
  )
  iosRenderControlBar = () => (
    <View style={styles.controlBar}>
      {this.iosRenderCancelButton()}
      {this.iosRenderConfirmButton()}
    </View>
  )
  iosOnTempDateChange = (date) => { this.setState({ tempDate: date }); }
  iosRenderDatePicker = () => (
    <DatePickerIOS
      style={styles.datePicker}
      mode={'date'}
      date={this.state.tempDate}
      onDateChange={this.iosOnTempDateChange}
      minimumDate={this.props.minDate}
      maximumDate={this.props.maxDate}
    />
  );
  iosRenderModal = () => (
    <Modal
      visible={this.state.modalVisible}
      transparent
      animationType={'fade'}
      onRequestClose={() => { console.log('Modal has been closed.'); }}
    >
      <View style={[styles.modalContainer]}>
        <Animated.View
          style={[
            styles.modalContentContainer,
            { height: this.state.animatedHeight },
          ]}
        >
          {this.iosRenderControlBar()}
          {this.iosRenderDatePicker()}
        </Animated.View>
      </View>
    </Modal>
  )

  render() {
    this.state.momentDate.locale(this.props.locale);
    return (
      <View
        style={[styles.container, this.props.containerStyle]}
      >
        <TouchableOpacity
          style={[styles.touchableContainer, this.props.touchableContainerStyle]}
          onPress={this.openPicker}
        >
          <Text
            style={[styles.text, this.props.inputStyle]}
          >
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

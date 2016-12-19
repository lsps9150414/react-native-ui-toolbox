import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Modal,
  Picker,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ModalContainer from './ModalContainer';
import { DEFAULT_COLORS } from '../constants/colors';

const propTypes = {
  onValueChange: PropTypes.func,

  cancelBtnText: PropTypes.string, /* ios */
  confirmBtnText: PropTypes.string, /* ios */
  containerStyle: View.propTypes.style,
  touchableContainerStyle: View.propTypes.style,
  inputStyle: Text.propTypes.style,
};

const defaultProps = {
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginHorizontal: 16,
  },
});

export default class FormPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
      tempValue: '',
      iosModalVisible: false,
    };
    this.platformIOS = Platform.OS === 'ios';
  }
  androidRenderPicker = () => (
    <Picker
      selectedValue={this.state.selectedValue}
      onValueChange={lang => this.setState({ selectedValue: lang })}
      prompt={'propmt'}
      mode={'dialog'}
    >
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  )

  iosOpenModal = () => { this.setState({ iosModalVisible: true }); }
  iosCloseModal = () => { this.setState({ iosModalVisible: false }); }
  iosHandleModalCancel = () => {
    this.iosCloseModal();
    this.setState({ tempValue: this.state.selectedValue });
  }
  iosHandleModalConfirm = () => {
    this.iosCloseModal();
    this.setState({ selectedValue: this.state.tempValue },
      () => {
        if (typeof this.props.onValueChange === 'function') {
          this.props.onValueChange(this.state.selectedValue);
        }
      });
  }
  iosRenderPicker = () => (
    <Picker
      selectedValue={this.state.tempValue}
      onValueChange={lang => this.setState({ tempValue: lang })}
    >
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  )
  iosRenderModal = () => (
    <ModalContainer
      cancelBtnText={this.props.cancelBtnText}
      confirmBtnText={this.props.confirmBtnText}
      onCancel={this.iosHandleModalCancel}
      onConfirm={this.iosHandleModalConfirm}
      renderContent={this.iosRenderPicker}
      visible={this.state.iosModalVisible}
    />
  )
  iosRenderTouchable = () => (
    <TouchableOpacity
      style={[styles.touchableContainer, this.props.touchableContainerStyle]}
      onPress={this.iosOpenModal}
    >
      <Text
        style={[styles.text, this.props.inputStyle]}
      >
        {this.state.selectedValue}
      </Text>
      {this.iosRenderModal()}
    </TouchableOpacity>
  )
  render() {
    return (
      <View
        style={[styles.container, this.props.containerStyle]}
      >
        {this.platformIOS && this.iosRenderTouchable()}
        {!this.platformIOS && this.androidRenderPicker()}
      </View>
    );
  }

}

FormPicker.propTypes = propTypes;
FormPicker.defaultProps = defaultProps;

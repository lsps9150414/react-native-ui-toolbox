import PropTypes from 'prop-types';
import React, {
  Component,
} from 'react';
import {
  Animated,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  defaultModalProps,
  modalPropTypes,
} from './proptypes';

const DEFAULT_CONTROL_BAR_HEIGHT = 50;

const styles = StyleSheet.create({
  fullScreenModalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  animatedContainer: {
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  controlBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderColor: '#ccc',
  },
  bodyContentContainer: {
    alignItems: 'stretch',
  },
  controlButton: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});

const propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  ...modalPropTypes,
};

const defaultProps = {
  ...defaultModalProps,
  children: undefined,
  onCancel: undefined,
  onConfirm: undefined,
  controlBarHeight: DEFAULT_CONTROL_BAR_HEIGHT,
  height: DEFAULT_CONTROL_BAR_HEIGHT + 216,
  cancelBtnTextStyle: { color: 'red' },
  confirmBtnTextStyle: { color: 'blue' },
};

export default class ModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // modalVisible: false,
      modalAnimatedHeight: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && nextProps.visible !== this.props.visible) {
      this.openModal();
    } else if (!nextProps.visible && nextProps.visible !== this.props.visible) {
      this.closeModal();
    }
  }

  openModal = () => {
    Animated.timing(
      this.state.modalAnimatedHeight,
      { toValue: this.props.height, duration: 300 },
    ).start();
  }

  closeModal = () => {
    this.setState({ modalAnimatedHeight: new Animated.Value(0) });
  }

  renderControlButton = (btnType, handler) => {
    const isCancel = () => (btnType === 'CANCEL');
    const {
      cancelBtnText,
      confirmBtnText,
      cancelBtnStyle,
      confirmBtnStyle,
      cancelBtnTextStyle,
      confirmBtnTextStyle,
    } = this.props;

    const displayBtnText = isCancel() ? cancelBtnText : confirmBtnText;
    const btnStyle = isCancel() ? cancelBtnStyle : confirmBtnStyle;
    const btnTextStyle = isCancel() ? cancelBtnTextStyle : confirmBtnTextStyle;

    return (
      <TouchableOpacity style={[styles.controlButton, btnStyle]} onPress={handler}>
        <Text style={[btnTextStyle]}>
          {displayBtnText}
        </Text>
      </TouchableOpacity>
    );
  }

  renderControlBar = (isOnTop = false) => (
    <View
      style={[
        styles.controlBar,
        isOnTop && { borderBottomWidth: StyleSheet.hairlineWidth },
        !isOnTop && { borderTopWidth: StyleSheet.hairlineWidth },
        this.props.controlBarStyle,
        { height: this.props.controlBarHeight },
      ]}
    >
      {this.renderControlButton('CANCEL', this.props.onCancel)}
      {this.renderControlButton('CONFIRM', this.props.onConfirm)}
    </View>
  )

  renderBody = () => (
    <ScrollView
      style={[this.props.bodyContainerStyle]}
      contentContainerStyle={[styles.bodyContentContainer, this.props.bodyContentContainerStyle]}
    >
      {this.props.children}
    </ScrollView>
  )

  renderModalChildContent = (controlBarPosition) => {
    const controlBarOnTop = controlBarPosition === 'top';
    if (controlBarOnTop) {
      return (
        <View style={{ flex: 1 }}>
          {this.renderControlBar(controlBarOnTop)}
          {this.renderBody()}
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        {this.renderBody()}
        {this.renderControlBar(controlBarOnTop)}
      </View>
    );
  }

  renderModalChild = (fullScreen) => {
    if (fullScreen) {
      return (
        <View style={[styles.fullScreenModalContainer, this.props.containerStyle]}>
          {this.renderModalChildContent(this.props.controlBarPosition)}
        </View>
      );
    }
    return (
      <View style={[styles.modalContainer]}>
        <Animated.View
          style={[
            styles.animatedContainer,
            this.props.containerStyle,
            { height: this.state.modalAnimatedHeight },
          ]}
        >
          {this.renderModalChildContent(this.props.controlBarPosition)}
        </Animated.View>
      </View>
    );
  }

  render() {
    const modalTransparent = !this.props.fullScreen;
    const modalAnimationType = this.props.fullScreen ? 'slide' : 'fade';

    return (
      <Modal
        visible={this.props.visible}
        transparent={modalTransparent}
        animationType={modalAnimationType}
        onRequestClose={() => { this.props.onCancel(); }}
      >
        {this.renderModalChild(this.props.fullScreen)}
      </Modal>
    );
  }
}

ModalContainer.propTypes = propTypes;
ModalContainer.defaultProps = defaultProps;

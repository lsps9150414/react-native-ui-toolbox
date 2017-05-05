import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  controlButton: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  controlButtonText: {
  },
});

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  cancelBtnText: PropTypes.string,
  confirmBtnText: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  controlBarHeight: PropTypes.number,
  modalHeight: PropTypes.number,
  fullScreen: PropTypes.bool,
};

const defaultProps = {
  controlBarHeight: DEFAULT_CONTROL_BAR_HEIGHT,
  modalHeight: DEFAULT_CONTROL_BAR_HEIGHT + 216,
  fullScreen: false,
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
      { toValue: this.props.modalHeight, duration: 300 },
    ).start();
  }
  closeModal = () => {
    this.setState({ modalAnimatedHeight: new Animated.Value(0) });
  }

  renderControlButton = (btnType, handler, btnText) => {
    let displayBtnText;
    let btnStyle;
    if (btnType === 'CANCEL') {
      displayBtnText = 'Cancel';
      btnStyle = { color: 'red' };
    } else {
      displayBtnText = 'Confirm';
    }
    return (
      <TouchableOpacity
        style={[styles.controlButton]}
        onPress={handler}
      >
        <Text style={[styles.controlButtonText, btnStyle]}>
          {Boolean(btnText) && btnText}
          {!btnText && displayBtnText}
        </Text>
      </TouchableOpacity>
    );
  }
  renderControlBar = () => (
    <View style={[styles.controlBar, { height: this.props.controlBarHeight }]}>
      {this.renderControlButton('CANCEL', this.props.onCancel, this.props.cancelBtnText)}
      {this.renderControlButton('CONFIRM', this.props.onConfirm, this.props.confirmBtnText)}
    </View>
  )
  renderAnimatedModalContent = () => (
    <View style={[styles.modalContainer]}>
      <Animated.View
        style={[
          styles.animatedContainer,
          { height: this.state.modalAnimatedHeight },
        ]}
      >
        {this.renderControlBar()}
        <View style={[styles.contentContainer]}>{this.props.children}</View>
      </Animated.View>
    </View>
  )
  renderFullScreenModalContent = () => (
    <View style={[styles.fullScreenModalContainer]}>
      <View style={[styles.contentContainer]}>{this.props.children}</View>
      {this.renderControlBar()}
    </View>
  )
  render() {
    const content = this.props.fullScreen ?
      this.renderFullScreenModalContent() : this.renderAnimatedModalContent();
    const modalAnimationType = this.props.fullScreen ? 'slide' : 'fade';
    const modalTransparent = !this.props.fullScreen;

    return (
      <Modal
        visible={this.props.visible}
        transparent={modalTransparent}
        animationType={modalAnimationType}
        onRequestClose={() => { this.props.onCancel(); }}
      >
        {content}
      </Modal>
    );
  }
}

ModalContainer.propTypes = propTypes;
ModalContainer.defaultProps = defaultProps;

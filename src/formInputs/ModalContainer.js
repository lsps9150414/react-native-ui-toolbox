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
} from 'react-native';

const MODAL_CONTROL_BAR_HEIGHT = 50;
const MODAL_CONTENT_HEIGHT = MODAL_CONTROL_BAR_HEIGHT + 220;
const MODAL_ANIMATION_CONFIG = {
  toValue: MODAL_CONTENT_HEIGHT,
  duration: 300,
};

const styles = StyleSheet.create({
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
});

const propTypes = {
  cancelBtnText: PropTypes.string,
  confirmBtnText: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  renderContent: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

const defaultProps = {};

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
    Animated.timing(this.state.modalAnimatedHeight, MODAL_ANIMATION_CONFIG).start();
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
    <View style={styles.controlBar}>
      {this.renderControlButton('CANCEL', this.props.onCancel, this.props.cancelBtnText)}
      {this.renderControlButton('CONFIRM', this.props.onConfirm, this.props.confirmBtnText)}
    </View>
  )
  render() {
    return (
      <Modal
        visible={this.props.visible}
        transparent
        animationType={'fade'}
        onRequestClose={() => { console.log('Modal has been closed.'); }}
      >
        <View style={[styles.modalContainer]}>
          <Animated.View
            style={[
              styles.modalContentContainer,
              { height: this.state.modalAnimatedHeight },
            ]}
          >
            {this.renderControlBar()}
            {this.props.renderContent()}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

ModalContainer.propTypes = propTypes;
ModalContainer.defaultProps = defaultProps;

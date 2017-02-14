import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { DEFAULT_COLORS } from './constants/colors';

const propTypes = {
  edit: PropTypes.bool.isRequired,
  onEditPress: PropTypes.func,
  innerContainerStyle: View.propTypes.style,
  onPress: PropTypes.func,
  size: PropTypes.number,
  source: PropTypes.object.isRequired,
  style: View.propTypes.style,
};

const defaultProps = {
  edit: false,
  size: 100,
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  innerContainer: {
    width: defaultProps.size,
    height: defaultProps.size,
    borderRadius: defaultProps.size / 2,
    backgroundColor: DEFAULT_COLORS[3].toHexString(),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    height: defaultProps.size,
    width: defaultProps.size,
    borderRadius: defaultProps.size / 2,
  },
  icon: {
    backgroundColor: 'transparent',
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DEFAULT_COLORS[3].toHexString(),
    ...Platform.select({
      ios: {
        shadowColor: DEFAULT_COLORS[0].toHexString(),
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});

export default class Avatar extends Component {
  render() {
    const customedSize = this.props.size ? {
      width: this.props.size,
      height: this.props.size,
      borderRadius: this.props.size / 2,
    } : null;
    const containerStyles = [
      styles.container,
      this.props.style,
    ];
    const innerContainerStyles = [
      styles.innerContainer,
      customedSize,
      this.props.innerContainerStyle,
    ];

    const display = (this.props.source && this.props.source.uri) ? (
      <Image
        source={this.props.source}
        style={[styles.avatar, customedSize]}
        resizeMode={'cover'}
      />
    ) : (
      <Icon
        style={styles.icon}
        name={'person'} size={this.props.size * 0.8} color={'#fff'}
      />
    );
    const editBtn = this.props.edit ? (
      <TouchableOpacity
        style={styles.editBtn}
        activeOpacity={0.95}
        onPress={this.props.onEditPress}
      >
        <Icon name={'mode-edit'} size={24} color={'#fff'} />
      </TouchableOpacity>
    ) : null;

    if (this.props.onPress) {
      return (
        <View style={containerStyles}>
          <TouchableOpacity
            style={innerContainerStyles}
            activeOpacity={0.95}
            onPress={this.props.onPress}
          >
            {display}
          </TouchableOpacity>
          {editBtn}
        </View>
      );
    }
    return (
      <View style={containerStyles}>
        <View style={innerContainerStyles}>
          {display}
        </View>
        {editBtn}
      </View>
    );
  }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  Component,
  PropTypes,
} from 'react';

import { DEFAULT_COLORS } from './constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const propTypes = {
  style: View.propTypes.style,
  source: PropTypes.object.isRequired,
  size: PropTypes.number,
  onPress: PropTypes.func,
};

const defaultProps = {
  size: 100,
};

const styles = StyleSheet.create({
  container: {
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
});

export default class Avatar extends Component {
  render() {
    const customedSize = this.props.size ? {
      width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2,
    } : null;
    const containerStyles = [styles.container, customedSize, this.props.style];
    const display = (this.props.source && this.props.source.uri) ? (
      <Image
        source={this.props.source}
        style={[styles.avatar, customedSize]}
        resizeMode={'cover'}
      />
    ) : (
      <Icon
        style={{ backgroundColor: 'transparent' }}
        name={'person'} size={this.props.size * 0.8} color={'#fff'}
      />
    );

    if (this.props.onPress) {
      return (
        <TouchableOpacity
          {...this.props}
          style={containerStyles}
        >
          {display}
        </TouchableOpacity>
      );
    }
    return (
      <View style={containerStyles}>
        {display}
      </View>
    );
  }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

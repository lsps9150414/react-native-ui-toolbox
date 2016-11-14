import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import React, {
  Component,
  PropTypes,
} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

const propTypes = {
  AvatarUrl: PropTypes.string.isRequired,
};

const defaultProps = {};

const styles = StyleSheet.create({
  AvatarAreaContainer: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AvatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  Avatar: {
    // NOTE: Temp fix for android not supporting overflow hidden.
    height: 100 - 2 * 2,
    width: 100 - 2 * 2,
    borderRadius: (100 - 2 * 2) / 2,
  },
});

export default class Avatar extends Component {

  render() {
    const image = this.props.AvatarUrl.length === 0 ? (
      <Icon
        style={{ backgroundColor: 'transparent' }}
        name={'user'} size={50} color={'black'}
      />
    ) : (
      <Image
        source={{ uri: this.props.AvatarUrl }}
        style={styles.Avatar}
        resizeMode={'cover'}
      />
    );
    return (
      <View style={styles.AvatarAreaContainer}>
        <View style={styles.AvatarContainer}>
          {image}
        </View>
      </View>
    );
  }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

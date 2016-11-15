import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import React, {
  Component,
  PropTypes,
} from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

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
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  Avatar: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
  },
});

export default class Avatar extends Component {
  render() {
    const image = this.props.AvatarUrl.length === 0 ? (
      <Icon
        style={{ backgroundColor: 'transparent' }}
        name={'person'} size={80} color={'#fff'}
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

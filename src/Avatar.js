import _ from 'lodash';
import { Icon } from 'react-native-elements';
import React, {
  PropTypes,
} from 'react';
import {
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';

import { DEFAULT_COLORS } from './constants/colors';

const propTypes = {
  component: PropTypes.func,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,

  size: PropTypes.number,
  rounded: PropTypes.bool,
  containerStyle: View.propTypes.style,
  avatarContainerStyle: View.propTypes.style,

  source: PropTypes.object,
  imageStyle: Image.propTypes.style,

  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    color: PropTypes.string,
    style: View.propTypes.style,
  }),

  title: PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    style: Text.propTypes.style,
  }),

  showEditButton: PropTypes.bool.isRequired,
  onEditPress: PropTypes.func,
  editButton: PropTypes.shape({
    size: PropTypes.number,
    iconName: PropTypes.string,
    iconType: PropTypes.string,
    iconColor: PropTypes.string,
    underlayColor: PropTypes.string,
    style: View.propTypes.style,
  }),

  showIndicator: PropTypes.bool,
  indicatorStyle: View.propTypes.style,
  statusTypes: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    color: PropTypes.string,
  })),
  status: PropTypes.string,
};

const DEFAULT_AVATAR_SIZE = 100;
const DEFAULT_EDIT_BTN_SIZE = DEFAULT_AVATAR_SIZE / 3;
const DEFAULT_INDICATOR_SIZE = DEFAULT_AVATAR_SIZE / 4;

const defaultProps = {
  component: View,
  onPress: null,
  onLongPress: null,

  size: DEFAULT_AVATAR_SIZE,
  rounded: false,
  containerStyle: null,
  avatarContainerStyle: null,

  source: null,
  imageStyle: null,

  icon: null,

  title: null,

  showEditButton: false,
  onEditPress: null,
  editButton: {
    size: DEFAULT_EDIT_BTN_SIZE,
    iconName: 'mode-edit',
    iconType: 'material',
    iconColor: '#fff',
    underlayColor: DEFAULT_COLORS[0].toHexString(),
    style: {},
  },

  showIndicator: false,
  statusTypes: [
    { key: 'active', color: 'green' },
    { key: 'inactive', color: 'red' },
  ],
  status: 'active',
  indicatorStyle: null,
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  avatarContainer: {
    backgroundColor: DEFAULT_COLORS[5].toHexString(),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    height: defaultProps.size,
    width: defaultProps.size,
  },
  title: {
  },
  icon: {
    backgroundColor: 'transparent',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DEFAULT_COLORS[4].toHexString(),
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
  indicator: {
    width: DEFAULT_INDICATOR_SIZE,
    height: DEFAULT_INDICATOR_SIZE,
    borderRadius: DEFAULT_INDICATOR_SIZE / 2,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

const Avatar = (props) => {
  const renderContent = () => {
    if (props.source) {
      return (
        <Image
          source={props.source}
          style={[styles.image, props.imageStyle && props.imageStyle]}
          resizeMode={'cover'}
        />
      );
    } else if (props.title) {
      return (
        <Text
          style={[styles.title, props.title.style && props.title.style]}
        >
          {props.title}
        </Text>
      );
    } else if (props.icon) {
      return (
        <Icon
          style={[styles.icon, props.icon.style && props.icon.style]}
          name={props.icon.name} size={props.size * 0.8} color={'#fff'}
        />
      );
    }
    return (
      <Icon
        style={styles.icon}
        name={'person'} size={props.size * 0.8} color={'#fff'}
      />
    );
  };

  const renderUtilities = () => {
    if (props.showEditButton) {
      const editButonProps = {
        ...defaultProps.editButton,
        ...props.editButton,
      };

      const editButtonSize = {
        width: props.editButton.size || props.size / 3,
        height: props.editButton.size || props.size / 3,
        borderRadius: (props.editButton.size / 2) || props.size / 6,
      };

      return (
        <TouchableHighlight
          style={[styles.editButton, editButtonSize, editButonProps.style]}
          underlayColor={editButonProps.underlayColor}
          onPress={props.onEditPress}
        >
          <View>
            <Icon
              size={editButonProps.size * 0.8}
              name={editButonProps.iconName}
              type={editButonProps.iconType}
              color={editButonProps.iconColor}
            />
          </View>
        </TouchableHighlight>
      );
    } else if (props.showIndicator) {
      const statusColor = _.find(props.statusTypes, { key: props.status }).color;
      return (
        <View
          style={[styles.indicator, { backgroundColor: statusColor }]}
        />
      );
    }
    return null;
  };

  let Component;
  if (props.onPress) {
    Component = TouchableHighlight;
  } else {
    Component = props.component;
  }

  const avatarSize = { width: props.size, height: props.size };
  const avatarRoundedStyle = props.rounded ? { borderRadius: props.size / 2 } : null;

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Component
        style={[styles.avatarContainer, avatarSize, avatarRoundedStyle, props.avatarContainerStyle]}
        activeOpacity={0.95}
        onPress={props.onPress}
        onLongPress={props.onLongPress}
      >
        {renderContent()}
      </Component>
      {renderUtilities()}
    </View>
  );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;

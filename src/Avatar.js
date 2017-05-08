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
  indicator: PropTypes.shape({
    size: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      color: PropTypes.string,
    })),
    status: PropTypes.string,
    style: View.propTypes.style,
  }),
};

const defaultProps = {
  component: View,
  onPress: null,
  onLongPress: null,

  size: 100,
  rounded: false,
  containerStyle: null,
  avatarContainerStyle: null,

  source: null,
  imageStyle: null,

  icon: {
    name: null,
    type: 'material',
    color: '#fff',
    style: null,
  },

  title: {
    text: null,
    color: DEFAULT_COLORS[3].toHexString(),
    style: null,
  },

  showEditButton: false,
  onEditPress: null,
  editButton: {
    size: null,
    iconName: 'mode-edit',
    iconType: 'material',
    iconColor: '#fff',
    underlayColor: DEFAULT_COLORS[0].toHexString(),
    style: null,
  },

  showIndicator: false,
  indicator: {
    size: null,
    types: [
      { key: 'active', color: 'green' },
      { key: 'inactive', color: 'red' },
    ],
    status: 'active',
    style: null,
  },
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
    textAlign: 'center',
    fontWeight: 'bold',
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
    } else if (props.icon.name) {
      const iconProps = { ...defaultProps.icon, ...props.icon };

      return (
        <Icon
          style={[styles.icon, iconProps.style]}
          name={iconProps.name}
          type={iconProps.type}
          size={props.size * 0.8}
          color={iconProps.color}
        />
      );
    } else if (props.title.text) {
      const titleProps = { ...defaultProps.title, ...props.title };
      const titleSizeStyle = { fontSize: props.size / 3 };
      const titleColorStyle = { color: titleProps.color };

      return (
        <Text style={[styles.title, titleSizeStyle, titleColorStyle, titleProps.style]}>
          {titleProps.text}
        </Text>
      );
    }
    return (
      <Icon
        style={styles.icon}
        name={'person'} size={props.size * 0.8} color={'#fff'}
      />
    );
  };

  const renderUtils = () => {
    if (props.showEditButton) {
      const editButonProps = { ...defaultProps.editButton, ...props.editButton };

      const defaultEditButtonSize = props.size / 3;
      const editButtonSize = props.editButton.size || defaultEditButtonSize;
      const editButtonSizeStyle = {
        width: editButtonSize,
        height: editButtonSize,
        borderRadius: editButtonSize / 2,
      };
      const editButtonIconSize = editButtonSize * 0.8;

      return (
        <TouchableHighlight
          style={[styles.editButton, editButtonSizeStyle, editButonProps.style]}
          underlayColor={editButonProps.underlayColor}
          onPress={props.onEditPress}
        >
          <View>
            <Icon
              size={editButtonIconSize}
              name={editButonProps.iconName}
              type={editButonProps.iconType}
              color={editButonProps.iconColor}
            />
          </View>
        </TouchableHighlight>
      );
    } else if (props.showIndicator) {
      const indicatorProps = { ...defaultProps.indicator, ...props.indicator };

      const defaultIndicatorSize = props.size / 4;
      const indicatorSize = props.indicator.size || defaultIndicatorSize;
      const indicatorSizeStyle = {
        width: indicatorSize,
        height: indicatorSize,
        borderRadius: indicatorSize / 2,
      };

      const statusColor = {
        backgroundColor: _.find(indicatorProps.types, { key: indicatorProps.status }).color,
      };

      return (
        <View
          style={[styles.indicator, indicatorSizeStyle, statusColor, indicatorProps.style]}
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
      {renderUtils()}
    </View>
  );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;

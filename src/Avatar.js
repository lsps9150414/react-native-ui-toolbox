import { Icon } from 'react-native-elements';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { DEFAULT_COLORS } from './constants/colors';

const propTypes = {
  component: PropTypes.oneOf([
    View,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
  ]),
  size: PropTypes.number,
  rounded: PropTypes.bool,
  containerStyle: ViewPropTypes.style,

  avatarContainerProps: PropTypes.object,
  avatarContainerStyle: ViewPropTypes.style,

  source: Image.propTypes.source,
  imageStyle: Image.propTypes.style,

  icon: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    style: ViewPropTypes.style,
  }),

  title: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
    style: Text.propTypes.style,
  }),

  showEditButton: PropTypes.bool,
  onEditPress: PropTypes.func,
  editButton: PropTypes.shape({
    size: PropTypes.number,
    iconName: PropTypes.string,
    iconType: PropTypes.string,
    iconColor: PropTypes.string,
    underlayColor: PropTypes.string,
    style: ViewPropTypes.style,
  }),

  showIndicator: PropTypes.bool,
  indicator: PropTypes.shape({
    size: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      color: PropTypes.string,
    })),
    status: PropTypes.string,
    style: ViewPropTypes.style,
  }),
};

const defaultProps = {
  component: View,
  size: 100,
  rounded: false,
  containerStyle: null,

  avatarContainerProps: {},
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
    alignItems: 'flex-start',
  },
  avatarContainer: {
    backgroundColor: DEFAULT_COLORS[5].toHexString(),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
  },
  icon: {
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
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

const Avatar = ({
  avatarContainerProps,
  avatarContainerStyle,
  component,
  containerStyle,
  editButton,
  icon,
  imageStyle,
  indicator,
  onEditPress,
  rounded,
  showEditButton,
  showIndicator,
  size,
  source,
  title,
}) => {
  const renderContent = () => {
    if (source) {
      const defaultImageSize = size;
      const imageSizeStyle = { width: defaultImageSize, height: defaultImageSize };

      /*
      Note: imageRoundedStyle is a temp fix due to `overflow: hidden` not working on android:
      https://github.com/facebook/react-native/issues/3198
      */
      const imageRoundedStyle = rounded ? { borderRadius: defaultImageSize / 2 } : null;

      return (
        <Image
          source={source}
          style={[styles.image, imageSizeStyle, imageRoundedStyle, imageStyle]}
          resizeMode="cover"
        />
      );
    } else if (icon.name) {
      const iconProps = { ...defaultProps.icon, ...icon };

      return (
        <Icon
          style={[styles.icon, iconProps.style]}
          name={iconProps.name}
          type={iconProps.type}
          size={size * 0.8}
          color={iconProps.color}
        />
      );
    } else if (title.text) {
      const titleProps = { ...defaultProps.title, ...title };
      const titleSizeStyle = { fontSize: size / 3 };
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
        name="person"
        size={size * 0.8}
        color="#fff"
      />
    );
  };

  const renderUtils = () => {
    if (showEditButton) {
      const editButonProps = { ...defaultProps.editButton, ...editButton };

      const defaultEditButtonSize = size / 3;
      const editButtonSize = editButton.size || defaultEditButtonSize;
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
          onPress={onEditPress}
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
    } else if (showIndicator) {
      const indicatorProps = { ...defaultProps.indicator, ...indicator };

      const defaultIndicatorSize = size / 4;
      const indicatorSize = indicator.size || defaultIndicatorSize;
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

  const Component = component;
  const avatarSize = { width: size, height: size };
  const avatarRoundedStyle = rounded ? { borderRadius: size / 2 } : null;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* This layer of View is for container to alignItems: flex-start */}
      <View>
        <Component
          {...avatarContainerProps}
          style={[
            styles.avatarContainer,
            avatarSize,
            avatarRoundedStyle,
            avatarContainerStyle,
          ]}
        >
          {renderContent()}
        </Component>
        {renderUtils()}
      </View>
    </View>
  );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;

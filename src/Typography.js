import React, { Component } from 'react';
import { Text } from 'react-native';

import themeProptypes from './constants/themeProptypes';
import { DEFAULT_COLORS } from './constants/colors';

const propTypes = {
  ...Text.propTypes,
  theme: themeProptypes,
};

const defaultProps = {};

const defaultTheme = {
  fontSizeBase: 12,
  fontStyle: 'normal',
  fontWeight: 'normal',
  textDecorationLine: 'none',
};

// Heading
export class Heading extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <Text
        {...this.props}
        style={[
          // Default
          {
            color: DEFAULT_COLORS[0].toHexString(),
            fontSize: defaultTheme.fontSizeBase * 2,
            fontStyle: defaultTheme.fontStyle,
            fontWeight: defaultTheme.fontWeight,
            textDecorationLine: defaultTheme.textDecorationLine,
          },
          // Base
          theme && theme.color && { color: theme.color },
          theme && theme.fontFamily && { fontFamily: theme.fontFamily },
          theme && theme.fontSizeBase && { fontSize: theme.fontSizeBase * 2 },
          theme && theme.fontStyle && { fontStyle: theme.fontStyle },
          theme && theme.fontWeight && { fontWeight: theme.fontWeight },
          theme && theme.textDecorationLine && { textDecorationLine: theme.textDecorationLine },
          theme && theme.textShadowColor && { textShadowColor: theme.textShadowColor },
          theme && theme.textShadowOffset && { textShadowOffset: theme.textShadowOffset },
          theme && theme.textShadowRadius && { textShadowRadius: theme.textShadowRadius },
          // Specific
          theme && theme.colorHeading && { color: theme.colorHeading },
          theme && theme.fontFamilyHeading && { fontFamily: theme.fontFamilyHeading },
          theme && theme.fontSizeHeading && { fontSize: theme.fontSizeHeading },
          theme && theme.fontStyleHeading && { fontStyle: theme.fontStyleHeading },
          theme && theme.fontWeightHeading && { fontWeight: theme.fontWeightHeading },
          theme && theme.lineHeightHeading && { lineHeight: theme.lineHeightHeading },
          theme && theme.textDecorationLineHeading && { textDecorationLine: theme.textDecorationLineHeading },
          theme && theme.textShadowColorHeading && { textShadowColor: theme.textShadowColorHeading },
          theme && theme.textShadowOffsetHeading && { textShadowOffset: theme.textShadowOffsetHeading },
          theme && theme.textShadowRadiusHeading && { textShadowRadius: theme.textShadowRadiusHeading },
          // Custom
          this.props.style,
        ]}
      >
        {this.props.children}
      </Text>
    );
  }
}

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

// Title
export class Title extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <Text
        {...this.props}
        style={[
          // Default
          {
            color: DEFAULT_COLORS[1].toHexString(),
            fontSize: defaultTheme.fontSizeBase * 1.5,
            fontStyle: defaultTheme.fontStyle,
            fontWeight: defaultTheme.fontWeight,
            textDecorationLine: defaultTheme.textDecorationLine,
          },
          // Base
          theme && theme.color && { color: theme.color },
          theme && theme.fontFamily && { fontFamily: theme.fontFamily },
          theme && theme.fontSizeBase && { fontSize: theme.fontSizeBase * 1.5 },
          theme && theme.fontStyle && { fontStyle: theme.fontStyle },
          theme && theme.fontWeight && { fontWeight: theme.fontWeight },
          theme && theme.textDecorationLine && { textDecorationLine: theme.textDecorationLine },
          theme && theme.textShadowColor && { textShadowColor: theme.textShadowColor },
          theme && theme.textShadowOffset && { textShadowOffset: theme.textShadowOffset },
          theme && theme.textShadowRadius && { textShadowRadius: theme.textShadowRadius },
          // Specific
          theme && theme.colorTitle && { color: theme.colorTitle },
          theme && theme.fontFamilyTitle && { fontFamily: theme.fontFamilyTitle },
          theme && theme.fontSizeTitle && { fontSize: theme.fontSizeTitle },
          theme && theme.fontStyleTitle && { fontStyle: theme.fontStyleTitle },
          theme && theme.fontWeightTitle && { fontWeight: theme.fontWeightTitle },
          theme && theme.lineHeightTitle && { lineHeight: theme.lineHeightTitle },
          theme && theme.textDecorationLineTitle && { textDecorationLine: theme.textDecorationLineTitle },
          theme && theme.textShadowColorTitle && { textShadowColor: theme.textShadowColorTitle },
          theme && theme.textShadowOffsetTitle && { textShadowOffset: theme.textShadowOffsetTitle },
          theme && theme.textShadowRadiusTitle && { textShadowRadius: theme.textShadowRadiusTitle },
          // Custom
          this.props.style,
        ]}
      >
        {this.props.children}
      </Text>
    );
  }
}

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

// Subtitle
export class Subtitle extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <Text
        {...this.props}
        style={[
          // Default
          {
            color: DEFAULT_COLORS[2].toHexString(),
            fontSize: defaultTheme.fontSizeBase * 1.2,
            fontStyle: defaultTheme.fontStyle,
            fontWeight: defaultTheme.fontWeight,
            textDecorationLine: defaultTheme.textDecorationLine,
          },
          // Base
          theme && theme.color && { color: theme.color },
          theme && theme.fontFamily && { fontFamily: theme.fontFamily },
          theme && theme.fontSizeBase && { fontSize: theme.fontSizeBase * 1.2 },
          theme && theme.fontStyle && { fontStyle: theme.fontStyle },
          theme && theme.fontWeight && { fontWeight: theme.fontWeight },
          theme && theme.textDecorationLine && { textDecorationLine: theme.textDecorationLine },
          theme && theme.textShadowColor && { textShadowColor: theme.textShadowColor },
          theme && theme.textShadowOffset && { textShadowOffset: theme.textShadowOffset },
          theme && theme.textShadowRadius && { textShadowRadius: theme.textShadowRadius },
          // Specific
          theme && theme.colorSubtitle && { color: theme.colorSubtitle },
          theme && theme.fontFamilySubtitle && { fontFamily: theme.fontFamilySubtitle },
          theme && theme.fontSizeSubtitle && { fontSize: theme.fontSizeSubtitle },
          theme && theme.fontStyleSubtitle && { fontStyle: theme.fontStyleSubtitle },
          theme && theme.fontWeightSubtitle && { fontWeight: theme.fontWeightSubtitle },
          theme && theme.lineHeightSubtitle && { lineHeight: theme.lineHeightSubtitle },
          theme && theme.textDecorationLineSubtitle && { textDecorationLine: theme.textDecorationLineSubtitle },
          theme && theme.textShadowColorSubtitle && { textShadowColor: theme.textShadowColorSubtitle },
          theme && theme.textShadowOffsetSubtitle && { textShadowOffset: theme.textShadowOffsetSubtitle },
          theme && theme.textShadowRadiusSubtitle && { textShadowRadius: theme.textShadowRadiusSubtitle },
          // Custom
          this.props.style,
        ]}
      >
        {this.props.children}
      </Text>
    );
  }
}

Subtitle.propTypes = propTypes;
Subtitle.defaultProps = defaultProps;

// BodyText
export class BodyText extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <Text
        {...this.props}
        style={[
          // Default
          {
            color: DEFAULT_COLORS[3].toHexString(),
            fontSize: defaultTheme.fontSizeBase,
            fontStyle: defaultTheme.fontStyle,
            fontWeight: defaultTheme.fontWeight,
            textDecorationLine: defaultTheme.textDecorationLine,
          },
          // Base
          theme && theme.color && { color: theme.color },
          theme && theme.fontFamily && { fontFamily: theme.fontFamily },
          theme && theme.fontSizeBase && { fontSize: theme.fontSizeBase },
          theme && theme.fontStyle && { fontStyle: theme.fontStyle },
          theme && theme.fontWeight && { fontWeight: theme.fontWeight },
          theme && theme.textDecorationLine && { textDecorationLine: theme.textDecorationLine },
          theme && theme.textShadowColor && { textShadowColor: theme.textShadowColor },
          theme && theme.textShadowOffset && { textShadowOffset: theme.textShadowOffset },
          theme && theme.textShadowRadius && { textShadowRadius: theme.textShadowRadius },
          // Specific
          theme && theme.colorBodyText && { color: theme.colorBodyText },
          theme && theme.fontFamilyBodyText && { fontFamily: theme.fontFamilyBodyText },
          theme && theme.fontSizeBodyText && { fontSize: theme.fontSizeBodyText },
          theme && theme.fontStyleBodyText && { fontStyle: theme.fontStyleBodyText },
          theme && theme.fontWeightBodyText && { fontWeight: theme.fontWeightBodyText },
          theme && theme.lineHeightBodyText && { lineHeight: theme.lineHeightBodyText },
          theme && theme.textDecorationLineBodyText && { textDecorationLine: theme.textDecorationLineBodyText },
          theme && theme.textShadowColorBodyText && { textShadowColor: theme.textShadowColorBodyText },
          theme && theme.textShadowOffsetBodyText && { textShadowOffset: theme.textShadowOffsetBodyText },
          theme && theme.textShadowRadiusBodyText && { textShadowRadius: theme.textShadowRadiusBodyText },
          // Custom
          this.props.style,
        ]}
      >
        {this.props.children}
      </Text>
    );
  }
}

BodyText.propTypes = propTypes;
BodyText.defaultProps = defaultProps;

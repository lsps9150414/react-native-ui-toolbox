import React, {
  Component,
  PropTypes,
} from 'react';

import { DEFAULT_COLORS } from './constants/colors';
import {
  Text,
} from 'react-native';

const fontStylePropTypes = PropTypes.oneOf(['normal', 'italic']);
const fontWeightPropTypes = PropTypes.oneOf(['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900']);
const textDecorationLinePropTypes = PropTypes.oneOf(['none', 'underline', 'line-through', 'underline line-through']);
const textShadowOffsetPropTypes = PropTypes.shape({ width: PropTypes.number, height: PropTypes.number });

const propTypes = {
  children: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    // Color
    color: PropTypes.string,
    colorHeading: PropTypes.string,
    colorTitle: PropTypes.string,
    colorSubtitle: PropTypes.string,
    colorText: PropTypes.string,
    // Family
    fontFamily: PropTypes.string,
    fontFamilyHeading: PropTypes.string,
    fontFamilyTitle: PropTypes.string,
    fontFamilySubtitle: PropTypes.string,
    fontFamilyText: PropTypes.string,
    // Size
    fontSizeBase: PropTypes.number,
    fontSizeHeading: PropTypes.number,
    fontSizeTitle: PropTypes.number,
    fontSizeSubtitle: PropTypes.number,
    fontSizeText: PropTypes.number,
    // Style
    fontStyle: fontStylePropTypes,
    fontStyleHeading: fontStylePropTypes,
    fontStyleTitle: fontStylePropTypes,
    fontStyleSubtitle: fontStylePropTypes,
    fontStyleText: fontStylePropTypes,
    // Weight
    fontWeight: fontWeightPropTypes,
    fontWeightHeading: fontWeightPropTypes,
    fontWeightTitle: fontWeightPropTypes,
    fontWeightSubtitle: fontWeightPropTypes,
    fontWeightText: fontWeightPropTypes,
    // Line Height
    lineHeightHeading: PropTypes.number,
    lineHeightTitle: PropTypes.number,
    lineHeightSubtitle: PropTypes.number,
    lineHeightText: PropTypes.number,
    // Text Decoration Line
    textDecorationLine: textDecorationLinePropTypes,
    textDecorationLineHeading: textDecorationLinePropTypes,
    textDecorationLineTitle: textDecorationLinePropTypes,
    textDecorationLineSubtitle: textDecorationLinePropTypes,
    textDecorationLineText: textDecorationLinePropTypes,
    // Shadow Color
    textShadowColor: PropTypes.string,
    textShadowColorHeading: PropTypes.string,
    textShadowColorTitle: PropTypes.string,
    textShadowColorSubtitle: PropTypes.string,
    textShadowColorText: PropTypes.string,
    // Shadow Offset
    textShadowOffset: textShadowOffsetPropTypes,
    textShadowOffsetHeading: textShadowOffsetPropTypes,
    textShadowOffsetTitle: textShadowOffsetPropTypes,
    textShadowOffsetSubtitle: textShadowOffsetPropTypes,
    textShadowOffsetText: textShadowOffsetPropTypes,
    // Shadow Radius
    textShadowRadius: PropTypes.number,
    textShadowRadiusHeading: PropTypes.number,
    textShadowRadiusTitle: PropTypes.number,
    textShadowRadiusSubtitle: PropTypes.number,
    textShadowRadiusText: PropTypes.number,
  }),
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
          theme.color && { color: theme.color },
          theme.fontFamily && { fontFamily: theme.fontFamily },
          theme.fontSizeBase && { fontSize: theme.fontSizeBase * 2 },
          theme.fontStyle && { fontStyle: theme.fontStyle },
          theme.fontWeight && { fontWeight: theme.fontWeight },
          theme.textDecorationLine && { textDecorationLine: theme.textDecorationLine },
          theme.textShadowColor && { textShadowColor: theme.textShadowColor },
          theme.textShadowOffset && { textShadowOffset: theme.textShadowOffset },
          theme.textShadowRadius && { textShadowRadius: theme.textShadowRadius },
          // Specific
          theme.colorHeading && { color: theme.colorHeading },
          theme.fontFamilyHeading && { fontFamily: theme.fontFamilyHeading },
          theme.fontSizeHeading && { fontSize: theme.fontSizeHeading },
          theme.fontStyleHeading && { fontStyle: theme.fontStyleHeading },
          theme.fontWeightHeading && { fontWeight: theme.fontWeightHeading },
          theme.lineHeightHeading && { lineHeight: theme.lineHeightHeading },
          theme.textDecorationLineHeading && { textDecorationLine: theme.textDecorationLineHeading },
          theme.textShadowColorHeading && { textShadowColor: theme.textShadowColorHeading },
          theme.textShadowOffsetHeading && { textShadowOffset: theme.textShadowOffsetHeading },
          theme.textShadowRadiusHeading && { textShadowRadius: theme.textShadowRadiusHeading },
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
          theme.color && { color: theme.color },
          theme.fontFamily && { fontFamily: theme.fontFamily },
          theme.fontSizeBase && { fontSize: theme.fontSizeBase * 1.5 },
          theme.fontStyle && { fontStyle: theme.fontStyle },
          theme.fontWeight && { fontWeight: theme.fontWeight },
          theme.textDecorationLine && { textDecorationLine: theme.textDecorationLine },
          theme.textShadowColor && { textShadowColor: theme.textShadowColor },
          theme.textShadowOffset && { textShadowOffset: theme.textShadowOffset },
          theme.textShadowRadius && { textShadowRadius: theme.textShadowRadius },
          // Specific
          theme.colorTitle && { color: theme.colorTitle },
          theme.fontFamilyTitle && { fontFamily: theme.fontFamilyTitle },
          theme.fontSizeTitle && { fontSize: theme.fontSizeTitle },
          theme.fontStyleTitle && { fontStyle: theme.fontStyleTitle },
          theme.fontWeightTitle && { fontWeight: theme.fontWeightTitle },
          theme.lineHeightTitle && { lineHeight: theme.lineHeightTitle },
          theme.textDecorationLineTitle && { textDecorationLine: theme.textDecorationLineTitle },
          theme.textShadowColorTitle && { textShadowColor: theme.textShadowColorTitle },
          theme.textShadowOffsetTitle && { textShadowOffset: theme.textShadowOffsetTitle },
          theme.textShadowRadiusTitle && { textShadowRadius: theme.textShadowRadiusTitle },
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
          theme.color && { color: theme.color },
          theme.fontFamily && { fontFamily: theme.fontFamily },
          theme.fontSizeBase && { fontSize: theme.fontSizeBase * 1.2 },
          theme.fontStyle && { fontStyle: theme.fontStyle },
          theme.fontWeight && { fontWeight: theme.fontWeight },
          theme.textDecorationLine && { textDecorationLine: theme.textDecorationLine },
          theme.textShadowColor && { textShadowColor: theme.textShadowColor },
          theme.textShadowOffset && { textShadowOffset: theme.textShadowOffset },
          theme.textShadowRadius && { textShadowRadius: theme.textShadowRadius },
          // Specific
          theme.colorSubtitle && { color: theme.colorSubtitle },
          theme.fontFamilySubtitle && { fontFamily: theme.fontFamilySubtitle },
          theme.fontSizeSubtitle && { fontSize: theme.fontSizeSubtitle },
          theme.fontStyleSubtitle && { fontStyle: theme.fontStyleSubtitle },
          theme.fontWeightSubtitle && { fontWeight: theme.fontWeightSubtitle },
          theme.lineHeightSubtitle && { lineHeight: theme.lineHeightSubtitle },
          theme.textDecorationLineSubtitle && { textDecorationLine: theme.textDecorationLineSubtitle },
          theme.textShadowColorSubtitle && { textShadowColor: theme.textShadowColorSubtitle },
          theme.textShadowOffsetSubtitle && { textShadowOffset: theme.textShadowOffsetSubtitle },
          theme.textShadowRadiusSubtitle && { textShadowRadius: theme.textShadowRadiusSubtitle },
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
          theme.color && { color: theme.color },
          theme.fontFamily && { fontFamily: theme.fontFamily },
          theme.fontSizeBase && { fontSize: theme.fontSizeBase },
          theme.fontStyle && { fontStyle: theme.fontStyle },
          theme.fontWeight && { fontWeight: theme.fontWeight },
          theme.textDecorationLine && { textDecorationLine: theme.textDecorationLine },
          theme.textShadowColor && { textShadowColor: theme.textShadowColor },
          theme.textShadowOffset && { textShadowOffset: theme.textShadowOffset },
          theme.textShadowRadius && { textShadowRadius: theme.textShadowRadius },
          // Specific
          theme.colorBodyText && { color: theme.colorBodyText },
          theme.fontFamilyBodyText && { fontFamily: theme.fontFamilyBodyText },
          theme.fontSizeBodyText && { fontSize: theme.fontSizeBodyText },
          theme.fontStyleBodyText && { fontStyle: theme.fontStyleBodyText },
          theme.fontWeightBodyText && { fontWeight: theme.fontWeightBodyText },
          theme.lineHeightBodyText && { lineHeight: theme.lineHeightBodyText },
          theme.textDecorationLineBodyText && { textDecorationLine: theme.textDecorationLineBodyText },
          theme.textShadowColorBodyText && { textShadowColor: theme.textShadowColorBodyText },
          theme.textShadowOffsetBodyText && { textShadowOffset: theme.textShadowOffsetBodyText },
          theme.textShadowRadiusBodyText && { textShadowRadius: theme.textShadowRadiusBodyText },
        ]}
      >
        {this.props.children}
      </Text>
    );
  }
}

BodyText.propTypes = propTypes;
BodyText.defaultProps = defaultProps;

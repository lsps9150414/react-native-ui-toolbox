import { PropTypes } from 'prop-types';

/* eslint-disable max-len */
const fontStylePropTypes = PropTypes.oneOf(['normal', 'italic']);
const fontWeightPropTypes = PropTypes.oneOf(['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900']);
const textDecorationLinePropTypes = PropTypes.oneOf(['none', 'underline', 'line-through', 'underline line-through']);
const textShadowOffsetPropTypes = PropTypes.shape({ width: PropTypes.number, height: PropTypes.number });
/* eslint-enable max-len */

export default PropTypes.shape({
  /* TEXT */
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
});

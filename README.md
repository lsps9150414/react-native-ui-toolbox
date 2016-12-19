# react-native-ui-toolbox
Just another collection of react native ui components.

## Included
- [x] Avatar
- Typography
  - [x] Heading
  - [x] Title
  - [x] Subtitle
  - [x] BodyText
- formInputs
  - [x] FormTextInput
  - [x] FormDatePicker

## Roadmap
- components
  - [ ] Inputs (with validation, custom state styles)
    - [ ] FormPicker
    - [ ] FormTextBox
    - [ ] feature: inline error icon & customizable error block
  - [ ] Avatar with editor
- Style
  - [ ] Consistent theme options for all elements
  - [ ] Consistent default styles for all input types

## Installation
Inside your project:
```bash
npm install react-native-ui-toolbox --save
```

# API
## Avatar
## Typography
- Heading
- Title
- Subtitle
- BodyText

## FormTextInput
### FormTextInput props

> Also recevies all `TextInput` props

| prop | default | type | description | note |
| ---- | ---- | ---- | ---- | ---- |
| containerStyle | none | `View` style | styling for field's container | |
| inputStyle | none | `Text` style | styling for field's text. | |
| value | string | ---- | ---- | ---- |
| onChangeText | function | ---- | ---- | ---- |


## FormPicker
### FormPicker props

> Also recevies all `Picker` props

| prop | default | type | description | note |
| ---- | ---- | ---- | ---- | ---- |
| `android:` pickerStyleAndroid | none | `Picker` style | styling for Android's Picker | Use this instead of inputStyle. |
| containerStyle | none | `View` style | styling for field's container | |
| inputStyle | none | `Text` style | styling for field's text. | `android:` Use `pickerStyleAndroid` instead of this. |
| items | demo data | array of `{ label: [string], value: [string\number] }` | picker items | |
| onValueChange | function | ---- | ---- | ---- |


## FormDatePicker
### FormDatePicker props

> Also recevies all `DatePicker` props

| prop | default | type | description | note |
| ---- | ---- | ---- | ---- | ---- |
| containerStyle | none | `View` style | styling for field's container | |
| inputStyle | none | `Text` style | styling for field's text. | |
| date | date | ---- | ---- | ---- |
| minDate | date | ---- | ---- | ---- |
| maxDate | date | ---- | ---- | ---- |
| onDateChange | function | ---- | ---- | ---- |
| `ios:` cancelBtnText | string | ---- | ---- | ---- |
| `ios:` confirmBtnText | string | ---- | ---- | ---- |
| locale | locale string | ---- | ---- | ---- |


## Theme
```javascript
const fontStylePropTypes = PropTypes.oneOf(['normal', 'italic']);
const fontWeightPropTypes = PropTypes.oneOf(['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900']);
const textDecorationLinePropTypes = PropTypes.oneOf(['none', 'underline', 'line-through', 'underline line-through']);
const textShadowOffsetPropTypes = PropTypes.shape({ width: PropTypes.number, height: PropTypes.number });

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
```

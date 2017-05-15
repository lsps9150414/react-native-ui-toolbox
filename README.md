# react-native-ui-toolbox
Just another collection of **cross platform** React Native UI components.
> Extended from react-native-community's [`react-native-elements`](https://github.com/react-native-community/react-native-elements)

## Todo
- [ ] Make demoApp
- [ ] demoApp Tutorial
- [x] Refactor ModalContainer to render content directly with children
- [x] Refactor FormPicker to use pure RN implementation
- [x] FormInput components: accept custom touchable component
- [x] FormInput components: accept icon
- [x] `Modal`: props to config controlBar position
- [ ] `Modal`: props to config view mode (dialog/slide in)
- [ ] `FormPicker`: accept more list item props
- [ ] `FormSelect`: accept more list item props
- [ ] Add language config prop for ios DatePickerIOS

## Change logs
- 0.0.18:
  - [ ] `<FormDatePicker>`: prop `onDateChange` -> `onValueChange`


- 0.0.17: Update `Avatar` API.
- 0.0.16: Add `FormSelect`

## Demo
[React Native UI Toolbox Demo App]()

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
  - [x] FormPicker
  - [x] FormSelect
  - [x] feature: input value validation

## Roadmap
- components
  - [ ] Inputs (with validation, custom state styles)
    - [x] FormPicker
    - [ ] FormTextBox
    - [ ] FormDatePicker with timePicker option
    - [ ] feature: inline error icon & customizable error block
  - [ ] Avatar with editor
- Style
  - [ ] Consistent theme options for all elements
  - [x] Consistent default styles for all input types

## Installation

This is still under development!

~~Inside your project:~~
```bash
npm install react-native-ui-toolbox --save
```

# API
## Avatar
*Insert screenshot here*

*Insert sample code here*

### Props
```javascript
const propTypes = {
  component: PropTypes.oneOf([
    View,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
  ]),
  avatarContainerProps: PropTypes.object,

  size: PropTypes.number,
  rounded: PropTypes.bool,
  containerStyle: View.propTypes.style,
  avatarContainerStyle: View.propTypes.style,

  source: PropTypes.object,
  imageStyle: Image.propTypes.style,

  icon: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    style: View.propTypes.style,
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
```


## Typography
*Insert screenshot here*

*Insert sample code here*

- Heading
- Title
- Subtitle
- BodyText

## FormTextInput
*Insert gif screenshot here*

*Insert sample code here*

### props

> Also recevies all `TextInput` props

| prop | default | type | description | note |
| ---- | ---- | ---- | ---- | ---- |
| containerStyle | none | `View` style | styling for field's container | |
| inputStyle | none | `Text` style | styling for field's text. | |
| value | string | ---- | ---- | ---- |
| onChangeText | function | ---- | ---- | ---- |


## FormPicker
*Insert gif screenshot here*

*Insert sample code here*

### props

> Also recevies all `Picker` props

| prop | default | type | description | note |
| ---- | ---- | ---- | ---- | ---- |
| `android:` pickerStyleAndroid | none | `Picker` style | styling for Android's Picker | Use this instead of inputStyle. |
| containerStyle | none | `View` style | styling for field's container | |
| inputStyle | none | `Text` style | styling for field's text. | `android:` Use `pickerStyleAndroid` instead of this. |
| items | demo data | array of `{ label: [string], value: [string\number] }` | picker items | |
| onValueChange | function | ---- | ---- | ---- |

## FormSelect
*Insert gif screenshot here*

*Insert sample code here*

### props


## FormDatePicker
*Insert gif screenshot here*

*Insert sample code here*

### props

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

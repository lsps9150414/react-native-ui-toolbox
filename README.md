# react-native-ui-toolbox
Just another collection of **cross platform** React Native UI components.
> Extended from react-native-community's [`react-native-elements`](https://github.com/react-native-community/react-native-elements)

## Demo
[React Native UI Toolbox Demo App]()

## 0.0.18 Todo
- [ ] Make demoApp
- [ ] demoApp Tutorial
- [x] Fix Bug: FormSelect null selectedValues prop causes error.
- [x] Refactor: Rename `selectedValue` to `pickedValue` for `FormPicker`
- [x] Refactor: `FormDatePicker` allow clear value, sync internalDate with date props.

## Components Included
- [x] Avatar
- [x] Heading
- [x] Title
- [x] Subtitle
- [x] BodyText
- [x] FormTextInput
- [x] FormDatePicker
- [x] FormPicker
- [x] FormPickerNative
- [x] FormSelect

## Change logs
- 0.0.18:
  - [x] FormInput components: API breaking changes. See the API docs below.
  - [x] FormInput components: accept custom component as touchable
  - [x] FormInput components: add icon
  - [x] Refactor `FormPicker` to use pure RN implementation, Create `FormPickerNative` for native implementation
  - [x] Refactor ModalContainer to render content directly with children
  - [x] `Modal`: add props to config controlBar position
  - [x] `FormDatePicker`: add `mode` prop for picking time

- 0.0.17: Update `Avatar` API.
- 0.0.16: Add `FormSelect`

## Roadmap
- component
  - [ ] `FormTextBox`
  - [ ] Refactor typography components into a single `Text` with type props


- Feature
  - [ ] Error icon & customizable error block
  - [ ] `Modal`: props to config view mode (dialog/slide in)
  - [ ] `FormPicker`: accept more list item props (e.g. styles, custom component)
  - [ ] `FormSelect`: accept more list item props (e.g. styles, custom component)


- Style
  - [x] Consistent default styles for all input types
  - [ ] Consistent theme options for all elements

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

### Prop Types
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
```

### Default Props
```javascript
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
- Heading
- Title
- Subtitle
- BodyText

*Insert screenshot here*

*Insert sample code here*


## Form Inputs
- FormTextInput
- FormDatePicker
- FormPicker
- FormPickerNative
- FormSelect

*Insert gif screenshot here*

*Insert sample code here*

### Common Prop Types
```javascript
const inputFieldPropTypes = {
  component: PropTypes.any,
  componentProps: PropTypes.object,
  onValueChange: PropTypes.func,
  placeholder: PropTypes.string,
};

const stylePropTypes = {
  containerStyle: View.propTypes.style,
  contentContainerStyle: View.propTypes.style,
  inputStyle: Text.propTypes.style,
};

const modalPropTypes = {
  modal: PropTypes.shape({
    cancelBtnText: PropTypes.string,
    confirmBtnText: PropTypes.string,
    controlBarHeight: PropTypes.number,
    controlBarPosition: PropTypes.oneOf(['top', 'bottom']),
    height: PropTypes.number,
    fullScreen: PropTypes.bool,
    containerStyle: View.propTypes.style,
    bodyContainerStyle: View.propTypes.style,
    bodyContentContainerStyle: View.propTypes.style,
    controlBarStyle: View.propTypes.style,
    cancelBtnStyle: View.propTypes.style,
    confirmBtnStyle: View.propTypes.style,
    cancelBtnTextStyle: Text.propTypes.style,
    confirmBtnTextStyle: Text.propTypes.style,
  }),
};

const iconPropTypes = {
  showIcon: PropTypes.bool,
  icon: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    style: View.propTypes.style,
  }),
};
```

### Common Default Props
```javascript
const defaultInputFieldProps = {
  component: TouchableOpacity,
  componentProps: undefined,
  onValueChange: undefined,
};

const defaultModalProps = {
  modal: {
    cancelBtnText: 'CANCEL',
    confirmBtnText: 'CONFIRM',
    controlBarHeight: undefined,
    controlBarPosition: 'top',
    height: undefined,
    fullScreen: false,
    containerStyle: undefined,
    bodyContainerStyle: undefined,
    bodyContentContainerStyle: undefined,
    controlBarStyle: undefined,
    cancelBtnStyle: undefined,
    confirmBtnStyle: undefined,
    cancelBtnTextStyle: undefined,
    confirmBtnTextStyle: undefined,
  },
};

const defaultIconProps = {
  showIcon: false,
  icon: {
    name: 'settings',
    type: 'material',
    size: 28,
    color: DEFAULT_COLORS[2].toHexString(),
    containerStyle: { marginRight: 8 },
  },
};
```


### FormTextInput
#### Specific Prop Types
```javascript
const propTypes = {
  value: PropTypes.string,
};
```
> Also accepts all react native `TextInput` props except `onChangeText`, use `onValueChange` instead.

#### Specific Default Props
```javascript
const defaultProps = {
  value: undefined,
};
```

### FormDatePicker
#### Specific Prop Types
```javascript
const propTypes = {
  date: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  locale: PropTypes.string,
};
```
> Also accepts all react native `DatePicker` props

#### Specific Default Props
```javascript
const defaultProps = {
  date: undefined,
  maxDate: undefined, // DatePickerAndroid don't take null.
  minDate: undefined, // DatePickerAndroid don't take null.
  dateFormat: 'Y-M-D (dd)',
  timeFormat: 'hh:mm:ss A',
  locale: 'en',
  placeholder: 'Select a date...',
};
```


### FormPicker
#### Specific Prop Types
```javascript
const ACCEPT_VALUE_TYPES = [PropTypes.string, PropTypes.number, PropTypes.bool];
const ACCEPT_LABEL_TYPES = [PropTypes.string, PropTypes.number];

const propTypes = {
  pickedValue: PropTypes.oneOfType(ACCEPT_VALUE_TYPES),
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType(ACCEPT_VALUE_TYPES),
    label: PropTypes.oneOfType(ACCEPT_LABEL_TYPES),
  })).isRequired,
};
```

#### Specific Default Props
```javascript
const defaultProps = {
  items: [
    { label: 'item 1', value: 'item 1 value' },
    { label: 'item 2', value: 'item 2 value' },
  ],
  pickedValue: undefined,
  placeholder: 'Pick...',
};
```


### FormPickerNative
#### Specific Prop Types
```javascript
const ACCEPT_VALUE_TYPES = [PropTypes.string, PropTypes.number, PropTypes.bool];
const ACCEPT_LABEL_TYPES = [PropTypes.string, PropTypes.number];

const propTypes = {
  pickedValue: PropTypes.oneOfType(ACCEPT_VALUE_TYPES),
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType(ACCEPT_VALUE_TYPES),
    label: PropTypes.oneOfType(ACCEPT_LABEL_TYPES),
  })).isRequired,
};
```
> Also accepts all react native `Picker` props

#### Specific Default Props
```javascript
const defaultProps = {
  items: [
    { label: 'item 1', value: 'item 1 value' },
    { label: 'item 2', value: 'item 2 value' },
  ],
  pickedValue: undefined,
  placeholder: 'Pick...',
};
```


### FormSelect
#### Specific Prop Types
```javascript
const ACCEPT_VALUE_TYPES = [PropTypes.string, PropTypes.number, PropTypes.bool];
const ACCEPT_LABEL_TYPES = [PropTypes.string, PropTypes.number];

const propTypes = {
  selectedValues: PropTypes.arrayOf(PropTypes.oneOfType(ACCEPT_VALUE_TYPES)),
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType(ACCEPT_VALUE_TYPES),
    label: PropTypes.oneOfType(ACCEPT_LABEL_TYPES),
  })).isRequired,
};
```

#### Specific Default Props
```javascript
const defaultProps = {
  items: [
    { label: 'item 1', value: 'item 1 value' },
    { label: 'item 2', value: 'item 2 value' },
  ],
  selectedValues: [],
  placeholder: 'Select...',
};
```


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

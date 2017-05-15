import _FormDatePicker from './FormDatePicker';
import _FormInputHOC from './FormInputHOC';
import _FormPicker from './FormPicker';
import _FormPickerNative from './FormPickerNative';
import _FormSelect from './FormSelect';
import _FormTextInput from './FormTextInput';

export const FormInputHOC = _FormInputHOC;
export const FormDatePicker = _FormInputHOC(_FormDatePicker);
export const FormPicker = _FormInputHOC(_FormPicker);
export const FormPickerNative = _FormInputHOC(_FormPickerNative);
export const FormSelect = _FormInputHOC(_FormSelect);
export const FormTextInput = _FormInputHOC(_FormTextInput);

export WrappedTouchableNativeFeedback from './WrappedTouchableNativeFeedback';

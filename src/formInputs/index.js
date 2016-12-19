import _FormDatePicker from './FormDatePicker';
import _FormInputHOC from './FormInputHOC';
import _FormTextInput from './FormTextInput';

export const FormInputHOC = _FormInputHOC;
export const FormTextInput = _FormInputHOC(_FormTextInput);
export const FormDatePicker = _FormInputHOC(_FormDatePicker);

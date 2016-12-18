import _DatePicker from './DatePicker';
import _InputHOC from './InputHOC';
import _TextInput from './TextInput';

export const InputHOC = _InputHOC;
export const TextInput = _InputHOC(_TextInput);
export const DatePicker = _InputHOC(_DatePicker);

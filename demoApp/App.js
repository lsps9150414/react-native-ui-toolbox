import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, BodyText, FormDatePicker, FormPicker, FormTextInput, Heading, Subtitle, Title } from 'react-native-ui-toolbox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const ITEMS = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
  { label: 'Option 6', value: '6' },
  { label: 'Option 7', value: '7' },
  { label: 'Option 8', value: '8' },
  { label: 'Option 9', value: '9' },
  { label: 'Option 10', value: '10' },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputValue: 'This is a text input',
      locale: 'en',
      date: new Date(),
      selectedValue: ITEMS[2].value,
      items: ITEMS,
    };
  }
  textInputHandleChange = (value) => {
    console.log(value);
    this.setState({ textInputValue: value });
  }
  textInputValidator = value => (value.length > 4 && value.length < 21)
  textInputErrorText = 'Length must be between 5 and 20.'
  datePickerHandleDateChange = (date) => {
    console.log(date);
    this.setState({ date });
  }
  pickerHandleValueChange = (value) => {
    console.log(value);
    this.setState({ selectedValue: value });
  }
  render() {
    return (
      <View style={styles.container}>
        <Avatar source={{ uri: '' }} />
        <Heading>Heading</Heading>
        <Title>Title</Title>
        <Subtitle>Subtitle</Subtitle>
        <BodyText>BodyText</BodyText>

        <FormTextInput
          value={this.state.textInputValue}
          onChangeText={this.textInputHandleChange}
          containerStyle={{ }}
          validContainerStyle={{ borderBottomColor: 'green' }}
          invalidContainerStyle={{ borderBottomColor: 'red' }}
          inputStyle={{ color: 'blue' }}
          validInputStyle={{ color: 'green' }}
          invalidInputStyle={{ color: 'red' }}
          validator={this.textInputValidator}
          errorText={this.textInputErrorText}
        />
        <FormDatePicker
          date={this.state.date}
          locale={this.state.locale}
          onDateChange={this.datePickerHandleDateChange}
          confirmBtnText={'確定'}
          cancelBtnText={'取消'}
        />
        <FormPicker
          items={this.state.items}
          selectedValue={this.state.selectedValue}
          onValueChange={this.pickerHandleValueChange}
          containerStyle={{ backgroundColor: 'yellow' }}
        />
        <TouchableOpacity
          onPress={() => { this.setState({ locale: 'zh-tw', date: new Date(2000), selectedValue: ITEMS[0].value, items: [] }); }}
        >
          <Text>Test</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

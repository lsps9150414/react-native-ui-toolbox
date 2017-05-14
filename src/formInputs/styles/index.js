import { Platform, StyleSheet } from 'react-native';

const baseStyles = StyleSheet.create({
  inputStyle: {
    ...Platform.select({
      android: {
        paddingHorizontal: 8, // To align with Android <Picker>'s style.
      },
      ios: {
        paddingHorizontal: 8,
      },
    }),
  },
});

export default baseStyles;

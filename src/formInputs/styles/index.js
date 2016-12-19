import { Platform } from 'react-native';

export const fieldContainer = {
  ...Platform.select({
    ios: {
      marginHorizontal: 20,
    },
    android: {
      marginHorizontal: 15,
    },
  }),
};

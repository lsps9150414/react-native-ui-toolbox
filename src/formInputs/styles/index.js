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

export const touchableContainer = {
  flex: 1,
  justifyContent: 'center',
  ...Platform.select({
    android: {
      paddingHorizontal: 4,
    },
  }),
};

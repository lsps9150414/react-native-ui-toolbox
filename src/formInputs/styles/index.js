import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  fieldContainer: {
    ...Platform.select({
      ios: {
        marginHorizontal: 20,
      },
      android: {
        marginHorizontal: 15,
      },
    }),
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    ...Platform.select({
      android: {
        paddingVertical: 0,
        paddingHorizontal: 8,
      },
    }),
  },
});

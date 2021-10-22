import {StyleSheet} from 'react-native';
import FONTS from '../conts/fonts';
import COLORS from './colors';

const globalStyles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: 20,
  },
  logo: {height: 180, width: 130},
  card: {
    marginBottom: 40,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    elevation: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: COLORS.secondary,
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
  pInputContainer: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pInput: {
    height: 35,
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: COLORS.grey,
    width: '100%',
    borderRadius: 5,
  },
  pInputText: {fontSize: 13, color: COLORS.primary, fontFamily: FONTS.bold},
});

export default globalStyles;

import {StyleSheet} from 'react-native';
import FONTS from '../conts/fonts';
import COLORS from './colors';

const authStyles = StyleSheet.create({
  inputConatiner: {
    height: 45,
    borderWidth: 0.5,
    borderColor: COLORS.grey,
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    color: COLORS.secondary,
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
    maxWidth: '60%',
    fontSize: 15,
    color: COLORS.grey,
  },
  logo: {height: 200, width: 150},
  logoContainer: {
    flex: 1,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default authStyles;

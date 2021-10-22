import React from 'react';
import {Text, View, StyleSheet, ActivityIndicator, Modal} from 'react-native';
import FONTS from '../../../conts/fonts';
import COLORS from '../../../styles/colors';

const ScreenLoader = ({loading, transparent = true}) => {
  return (
    loading && (
      <View
        style={[
          styles.container,
          {
            backgroundColor: transparent
              ? 'rgba(0,0,0,0.1)'
              : 'rgba(255,255,255,1)',
          },
        ]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text
          style={[
            styles.text,
            {color: transparent ? COLORS.white : COLORS.primary},
          ]}>
          Loading...
        </Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 100,
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
});

export default ScreenLoader;

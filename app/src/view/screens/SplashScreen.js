import {View} from 'native-base';
import React from 'react';
import {Image, SafeAreaView} from 'react-native';
import {LOGO} from '../../conts/assets';
import COLORS from '../../styles/colors';
import globalStyles from '../../styles/styles';
const SplashScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, height: '100%'}}>
      {/* Container for image */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={LOGO} style={globalStyles.logo} />
      </View>
      {/* Image illustration */}
      <Image
        source={require('../../assets/illustration.png')}
        style={{height: 250, width: '100%'}}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

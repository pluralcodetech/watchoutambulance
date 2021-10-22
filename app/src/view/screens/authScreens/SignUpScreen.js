import React from 'react';
import {SafeAreaView, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Button, Input, Text, View} from 'native-base';
import FONTS from '../../../conts/fonts';
import COLORS from '../../../styles/colors';
import {LOGO} from '../../../conts/assets';
import authStyles from '../../../styles/authStyles';
const SignUpScreen = ({navigation}) => {
  return (
    <SafeAreaView style={authStyles.safeAreaView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={LOGO} style={authStyles.logo} />
        <View>
          <Text style={authStyles.title}>Create an Account</Text>
          <Text style={authStyles.text}>
            Start making fast & reliable payments and making money doing it!
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <View style={authStyles.inputConatiner}>
            <Input placeholder="First Name" />
          </View>
          <View style={authStyles.inputConatiner}>
            <Input placeholder="Last Name" />
          </View>
          <View style={authStyles.inputConatiner}>
            <Input placeholder="Email" />
          </View>
          <View style={authStyles.inputConatiner}>
            <Input placeholder="Phone" />
          </View>
          <View style={authStyles.inputConatiner}>
            <Input placeholder="Password" />
          </View>
          <View style={authStyles.inputConatiner}>
            <Input placeholder="Confirm Password" />
          </View>
        </View>
        <View style={{marginTop: 20, marginBottom: 40}}>
          <Text style={{fontSize: 14, marginBottom: 20}}>
            By tapping 'SING UP', you agree to the{' '}
            <Text style={{fontFamily: FONTS.bold, color: COLORS.secondary}}>
              Terms of use
            </Text>{' '}
            and{' '}
            <Text style={{fontFamily: FONTS.bold, color: COLORS.secondary}}>
              Privacy policy
            </Text>
          </Text>
          <Button block>
            <Text>SIGN UP</Text>
          </Button>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={authStyles.footerText}>
              Already have an account?{' '}
              <Text style={{color: COLORS.primary, fontSize: 20}}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

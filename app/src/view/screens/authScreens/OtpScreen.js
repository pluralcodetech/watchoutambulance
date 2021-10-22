import React from 'react';
import axios from 'axios';
import {SafeAreaView, ScrollView, Image, Alert} from 'react-native';
import {Button, Input, Text, View} from 'native-base';
import {LOGO} from '../../../conts/assets';
import authStyles from '../../../styles/authStyles';
import globalStyles from '../../../styles/styles';
import PreLoader from '../../components/loaders/PreLoader';

import qs from 'qs';
import API from '../../../conts/api';
import {updateUserData} from '../../../logics/auth';
const OtpScreen = ({navigation, route}) => {
  const {phone, code} = route.params;
  const [state, setState] = React.useState({
    phone,
    code,
    otp: '',
    showPreloader: false,
  });
  //Verify otp
  const sendOtp = async () => {
    //Validate user input
    if (state.otp == '') {
      Alert.alert('Alert', 'Please input OTP');
    } else if (state.otp.length < 4) {
      Alert.alert('Alert', 'Invalid OTP, OTP must be 4 characters');
    } else if (state.code != state.otp) {
      Alert.alert('Alert', 'Wrong otp please try again');
    } else {
      //Show preloader
      setState({...state, showPreloader: true});
      try {
        const res = await axios({
          url: API + '/login.php',
          method: 'POST',
          data: qs.stringify(state),
        });

        const resData = res.data;

        if (resData.statuscode == '00') {
          //Hide preloader
          setState({...state, showPreloader: false});

          const userData = {loggedIn: true, data: resData, otp: code, code};

          // //dispatch to store and save data to users phone
          await updateUserData(userData);
          //Navigate user to OTP page
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Error!', resData.status);
        }
      } catch (error) {
        //Hide preLoader
        setState({...state, showPreloader: false});
        Alert.alert('Error!', 'Something went wrong');
      }
    }
  };
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <PreLoader visible={state.showPreloader} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 20}}>
        {/* Logo container */}
        <View style={authStyles.logoContainer}>
          <Image source={LOGO} style={globalStyles.logo} />
        </View>

        {/* Text and input container */}
        <View
          style={{
            alignItems: 'center',
            marginBottom: 40,
          }}>
          <Text style={authStyles.title}>Verify Phone Number</Text>
          <Text style={authStyles.text}>
            an OTP has been sent to your phone number, kindly enter OTP below to
            proceed
          </Text>
          <View style={{flexDirection: 'row', marginTop: 60, marginBottom: 20}}>
            <View style={authStyles.inputConatiner}>
              <Input
                placeholder="Enter OTP"
                keyboardType="numeric"
                maxLength={4}
                onChangeText={value => setState({...state, otp: value})}
              />
            </View>
          </View>
          <Button block onPress={sendOtp}>
            <Text>LOGIN</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtpScreen;

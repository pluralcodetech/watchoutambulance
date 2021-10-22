import React from 'react';
import {SafeAreaView, ScrollView, Image, Alert} from 'react-native';
import axios from 'axios';
import {Button, Input, Text, View} from 'native-base';
import {LOGO} from '../../../conts/assets';
import authStyles from '../../../styles/authStyles';
import globalStyles from '../../../styles/styles';
import COLORS from '../../../styles/colors';
import API from '../../../conts/api';
import PreLoader from '../../components/loaders/PreLoader';
import qs from 'qs';

const SignInScreen = ({navigation}) => {
  const [state, setState] = React.useState({phone: '', showPreloader: false});
  //Sign in user
  const signInUser = async () => {
    // else if (state.phone.length < 11) {
    //   Alert.alert('Alert', 'Invalid phone number');
    // }
    //Validate user input
    if (state.phone == '') {
      Alert.alert('Alert', 'Please input phone number');
    } else {
      //Show preloader
      setState({...state, showPreloader: true});
      try {
        const res = await axios({
          url: API + '/otp.php',
          method: 'POST',
          data: qs.stringify({
            phone: state.phone,
          }),
        });

        const resData = res.data;
        console.log(resData);
        //Hide preLoader
        setState({...state, showPreloader: false});
        if (resData.statuscode == '00') {
          //Hide preloader
          setState({...state, showPreloader: false});

          //Navigate user to OTP page
          navigation.navigate('OtpScreen', {
            phone: state.phone,
            code: resData.otp,
          });
        } else {
          Alert.alert('Error!', resData.status);
        }
      } catch (error) {
        console.log(error);
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
          <Text style={authStyles.title}>Ambulance Driver App</Text>
          <Text style={authStyles.text}>
            Enter your phone number below to login to your account
          </Text>
          {/* Input container */}
          <View style={{flexDirection: 'row', marginTop: 60, marginBottom: 20}}>
            {/* <View
              style={{
                height: 45,
                width: 45,
                borderWidth: 0.5,
                borderColor: COLORS.grey,
                marginRight: 10,
                justifyContent: 'center',
                paddingHorizontal: 5,
              }}>
              <Text>+234</Text>
            </View> */}
            <View style={authStyles.inputConatiner}>
              <Input
                placeholder="Enter phone number"
                keyboardType="numeric"
                onChangeText={value => setState({...state, phone: value})}
              />
            </View>
          </View>
          <Button block onPress={signInUser}>
            <Text>CONTINUE</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

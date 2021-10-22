import React from 'react';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {View, Text, Button, Input} from 'native-base';
import qs from 'qs';
import {ActivityIndicator, SafeAreaView, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import COLORS from '../../styles/colors';
import globalStyles from '../../styles/styles';
import AppHeader from '../components/layouts/AppHeader';
import API from '../../conts/api';
import FONTS from '../../conts/fonts';
let caseRecordTimeout = null;
const CaseRecordsScreen = ({navigation}) => {
  const {data, code} = useSelector(state => state.userData);
  const [state, setState] = React.useState({
    id: data.id,
    code: code,
    otp: code,
    amb_carid: data.amb_carid,
  });

  const [availableCase, setAvailableCase] = React.useState(null);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      getCaseRecord();
    } else {
      clearTimeout(caseRecordTimeout);
      setAvailableCase(null);
    }
  }, [isFocused]);

  //Get the case record from the server
  const getCaseRecord = async () => {
    clearTimeout(caseRecordTimeout);
    try {
      const res = await axios({
        url: API + '/old_cases.php',
        method: 'POST',
        data: qs.stringify(state),
      });

      const resData = res.data;

      if (resData.statuscode == '00') {
        setAvailableCase(resData);
      } else {
        //Resend after 5sec if there is an error
        caseRecordTimeout = setTimeout(() => getCaseRecord(), 5000);
      }
    } catch (error) {
      console.log(error);
      //Resend after 5sec if there is an error
      caseRecordTimeout = setTimeout(() => getCaseRecord(), 5000);
    }
  };

  return (
    <SafeAreaView style={[globalStyles.safeAreaView, {paddingHorizontal: 0}]}>
      <AppHeader data={data} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: 40, marginHorizontal: 20}}>
          <View>
            {!availableCase ? (
              <View style={globalStyles.card}>
                <View style={{marginTop: 10}}>
                  <Text
                    style={{
                      marginVertical: 5,
                      fontFamily: FONTS.bold,
                    }}>
                    Geting case please wait...
                  </Text>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
              </View>
            ) : (
              <View>
                {availableCase.details.map((_case, index) => (
                  <View key={index}>
                    {_case?.status?.toLowerCase() == 'active' ? (
                      ///* Active case card */
                      <View style={globalStyles.card}>
                        <Text
                          style={[
                            globalStyles.cardTitle,
                            {color: COLORS.green},
                          ]}>
                          {_case?.nature + ' '} ({_case?.status})
                        </Text>
                        <Text
                          style={{
                            marginTop: 10,
                            color: COLORS.black,
                            fontSize: 14,
                          }}>
                          {_case?.date}
                        </Text>
                        <Text
                          style={{
                            marginTop: 5,
                            color: COLORS.primary,
                            fontSize: 14,
                            paddingHorizontal: 20,
                            textAlign: 'center',
                          }}>
                          Location: {_case?.scene_to}
                        </Text>
                        <View>
                          <Button
                            small
                            light
                            rounded
                            style={{marginTop: 10}}
                            onPress={() =>
                              navigation.navigate('CaseDetailsScreen', {
                                caseId: _case?.uid,
                              })
                            }>
                            <Text style={{fontSize: 11}}>View More</Text>
                          </Button>
                        </View>
                      </View>
                    ) : (
                      ///* Complete case card */
                      <View style={globalStyles.card}>
                        <Text
                          style={[
                            globalStyles.cardTitle,
                            {color: COLORS.primary},
                          ]}>
                          {_case?.nature + ' '} ({_case?.status})
                        </Text>
                        <Text
                          style={{
                            marginTop: 10,
                            color: COLORS.black,
                            fontSize: 14,
                          }}>
                          {_case?.date}
                        </Text>
                        <Text
                          style={{
                            marginTop: 5,
                            color: COLORS.primary,
                            fontSize: 14,
                            paddingHorizontal: 20,
                            textAlign: 'center',
                          }}>
                          Location: {_case?.scene_to}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            height: 55,
                          }}>
                          <View style={globalStyles.pInputContainer}>
                            <Input
                              style={globalStyles.pInput}
                              value={_case?.major}
                            />
                            <Text style={globalStyles.pInputText}>
                              Major inj.
                            </Text>
                          </View>
                          <View style={globalStyles.pInputContainer}>
                            <Input
                              style={globalStyles.pInput}
                              value={_case?.minor}
                            />
                            <Text style={globalStyles.pInputText}>
                              Minor inj.
                            </Text>
                          </View>
                          <View style={globalStyles.pInputContainer}>
                            <Input
                              style={globalStyles.pInput}
                              value={_case?.fatal}
                            />
                            <Text style={globalStyles.pInputText}>
                              Fatality
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CaseRecordsScreen;

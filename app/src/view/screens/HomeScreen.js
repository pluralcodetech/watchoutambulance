import React from 'react';
import {View, Text} from 'native-base';
import {SafeAreaView, ScrollView, StyleSheet, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import COLORS from '../../styles/colors';
import globalStyles from '../../styles/styles';
import axios from 'axios';
import qs from 'qs';
import FONTS from '../../conts/fonts';
import API from '../../conts/api';
import AppHeader from '../components/layouts/AppHeader';
import {updateUserData} from '../../logics/auth';
import PreLoader from '../components/loaders/PreLoader';
import DisplayCases from '../components/homeComponents/DisplayCases';

const HomeScreen = ({navigation}) => {
  const getDashboardataTimeOut = React.useRef(null);

  const isFocused = useIsFocused();

  const [currentCase, setCurrentCase] = React.useState({
    activeCase: false,
    loading: true,
    message: 'Getting case please wait...',
  });

  const [showPreloader, setShowPreloader] = React.useState(false);

  const {data, code, loggedIn} = useSelector(state => state.userData);

  React.useEffect(() => {
    getDashboardata();
  }, [isFocused]);

  const [state, setState] = React.useState({
    phone: data.phone,
    code,
    otp: code,
    amb_carid: data.amb_carid,
    fatal: data.fatal,
    minor: data.minor,
  });

  //Get data to display for user
  const getDashboardata = async () => {
    clearTimeout(getDashboardataTimeOut.current);
    //Return if the the user is not loggedin
    if (loggedIn && isFocused) {
      console.log('Logged In');
      try {
        const res = await axios({
          url: API + '/dashboard.php',
          method: 'POST',
          data: qs.stringify(state),
        });

        const resData = res.data;

        if (resData.statuscode == '00') {
          const userData = {loggedIn: true, data: resData, code, otp: code};

          //Dispatch to store and save data to users phone
          await updateUserData(userData);

          //Get new case
          getNewcase(resData);

          //Hide preloader
          setTimeout(() => {
            setShowPreloader(false);
          }, 2000);
          //Resend after 5sec
          getDashboardataTimeOut.current = setTimeout(
            () => getDashboardata(),
            5000,
          );
        } else {
          //Resend after 5sec if there is an error
          getDashboardataTimeOut.current = setTimeout(
            () => getDashboardata(),
            5000,
          );
        }
      } catch (error) {
        console.log(error);
        //Resend after 5sec if there is an error
        getDashboardataTimeOut.current = setTimeout(
          () => getDashboardata(),
          5000,
        );
      }
    } else {
      console.log('Not LoggedIn');
    }
  };

  // Get and display new case
  const getNewcase = async caseData => {
    if (caseData.active_case_id != '') {
      //Set active case to true after 3s
      setTimeout(
        () =>
          setCurrentCase({
            activeCase: true,
            pendingCase: false,
            loading: true,
            message: 'You have an active case to attend to.',
          }),
        3000,
      );
    } else if (caseData.pending_case_id != '') {
      getCaseDetails(caseData);
    } else {
      setTimeout(
        () =>
          setCurrentCase({
            activeCase: false,
            pendingCase: false,
            noCase: true,
            loading: true,
            message: 'No current cases please check back later.',
          }),
        3000,
      );
    }
  };

  //Get case details
  const getCaseDetails = async caseData => {
    try {
      const res = await axios({
        url: API + '/new_cases.php',
        method: 'POST',
        data: qs.stringify({
          id: caseData.id,
          code,
          otp: code,
          amb_carid: caseData.amb_carid,
        }),
      });

      const resData = res.data;

      if (resData.statuscode == '00') {
        //Update current case
        setTimeout(
          () =>
            setCurrentCase({
              activeCase: false,
              pendingCase: true,
              loading: true,
              message: '',
              ...resData,
            }),
          3000,
        );
      } else {
        //Set active case to false and loading true
        setCurrentCase({
          activeCase: false,
          pendingCase: false,
          loading: true,
          message: 'Getting case please wait...',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //setUser to case details page
  const sendUserToCaseDetailsScreen = caseId => {
    console.log(caseId);
    navigation.navigate('CaseDetailsScreen', {caseId, acceptCase, declineCase});
  };

  // acceptCase if there is any available
  const acceptCase = async () => {
    Alert.alert('Confirm', 'Accept case?', [
      {text: 'No'},
      {
        text: 'Yes',
        onPress: async () => {
          setShowPreloader(true);
          try {
            const res = await axios({
              url: API + '/accept_case.php',
              method: 'POST',
              data: qs.stringify({...state, case_id: currentCase.uid}),
            });

            const resData = res.data;
            console.log(resData);
            if (resData.statuscode == '00') {
              getDashboardata();
              //Send user to case details screen
              sendUserToCaseDetailsScreen(currentCase.uid);
            } else {
              //Hide preloader
              setShowPreloader(false);
              Alert.alert('Error!', 'Something went wrong please try again');
            }
          } catch (error) {
            //Hide preloader
            setShowPreloader(false);
            console.log(error);
            Alert.alert('Error!', 'Something went wrong please try again');
          }
        },
      },
    ]);
  };
  const declineCase = () => {
    Alert.alert('Confirm', 'Decline case?', [
      {text: 'No'},
      {
        text: 'Yes',
        onPress: async () => {
          setShowPreloader(true);
          try {
            const res = await axios({
              url: API + '/decline_case.php',
              method: 'POST',
              data: qs.stringify({...state, case_id: currentCase.uid}),
            });

            const resData = res.data;
            console.log(resData);
            if (resData.statuscode == '00') {
              //Update currentCase state
              setCurrentCase({
                activeCase: false,
                pendingCase: false,
                loading: true,
                message: 'Getting new case please wait...',
              });
              getDashboardata();
            } else {
              //Hide preloader
              setShowPreloader(false);
              Alert.alert('Error!', 'Something went wrong please try again');
            }
          } catch (error) {
            //Hide preloader
            setShowPreloader(false);
            console.log(error);
            Alert.alert('Error!', 'Something went wrong please try again');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[globalStyles.safeAreaView, {paddingHorizontal: 0}]}>
      <PreLoader visible={showPreloader} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppHeader data={data} />
        {/* Case card container */}
        <View
          style={{
            marginTop: 40,
            marginBottom: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.caseCard}>
            <Text
              style={{
                fontSize: 28,
                fontFamily: FONTS.bold,
                color: COLORS.primary,
              }}>
              {!data.assigned_cases ? '0' : data.assigned_cases}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.grey,
              }}>
              Assigned Cases
            </Text>
          </View>

          <View style={styles.caseCard}>
            <Text
              style={{
                fontSize: 28,
                fontFamily: FONTS.bold,
                color: COLORS.secondary,
              }}>
              {!data.complete_cases ? '0' : data.complete_cases}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.grey,
              }}>
              Completed Cases
            </Text>
          </View>
        </View>
        <DisplayCases
          currentCase={currentCase}
          acceptCase={acceptCase}
          declineCase={declineCase}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  caseCard: {
    height: 100,
    width: 150,
    backgroundColor: COLORS.white,
    elevation: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caseAlertCard: {
    paddingTop: 40,
    paddingBottom: 50,
    elevation: 10,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});

export default HomeScreen;

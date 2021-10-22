import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import {userDataAction} from '../redux/actions';
import Store from '../redux/store';

//get the user data from AsyncStorage
const getUserData = async () => {
  const newData = {loggedIn: false, data: {}};

  try {
    let userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      await updateUserData(newData);
      return newData;
    } else {
      return (userData = JSON.parse(userData));
    }
  } catch (error) {
    return false;
  }
};

const logoutUser = navigation => {
  Alert.alert('Confirm', 'Logout account?', [
    {text: 'No'},
    {
      text: 'Yes',
      onPress: async () => {
        //clear the user data
        await updateUserData({
          data: {},
          loggedIn: false,
          code: null,
          otp: null,
        });
        //send user to login screen
        navigation.navigate('SignInScreen');
      },
    },
  ]);
};

//authenticate user
const authUser = async navigate => {
  const userData = await getUserData();
  try {
    // check if the user is not logged in
    if (!userData.loggedIn) {
      // if (navigate) {
      //   navigate.navigate('InScreen');
      // }
      return false;
    } else {
    }
  } catch (error) {}
};

//dispatch data when user  open the app
const dispatchUserDataToStore = async () => {
  const data = await getUserData();
  if (data) {
    await Store.dispatch(userDataAction(data));
  }
};

const updateUserData = async data => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    //dispatch to store
    await Store.dispatch(userDataAction(data));

    //save to user device
  } catch (error) {}
};

export {authUser, updateUserData, dispatchUserDataToStore, logoutUser};

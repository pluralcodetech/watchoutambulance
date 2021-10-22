import {Alert} from 'react-native';
import axios from 'axios';
import qs from 'qs';
import API from '../conts/api';
import {updateUserData} from './auth';

const goOfflineOrOnline = async (data, setShowPreloader) => {
  setShowPreloader(true);
  const isOnline = data.is_online.toLowerCase();
  const endPoint = isOnline == 'yes' ? '/go_offline.php' : '/go_online.php';
  try {
    const res = await axios({
      url: API + endPoint,
      method: 'POST',
      data: qs.stringify({
        phone: data.phone,
        minor: data.minor,
        case_id: data.case_id,
        amb_carid: data.amb_carid,
        fatal: data.fatal,
      }),
    });
    const resData = res.data;
    console.log(resData);
    setShowPreloader(false);
    if (resData.statuscode == '00') {
      const userData = {
        loggedIn: true,
        data: {
          ...data,
          is_online: isOnline == 'yes' ? 'No' : 'Yes',
        },
        code: data.code,
        otp: data.code,
      };
      //   // //dispatch to store and save data to users phone
      await updateUserData(userData);
    } else {
      Alert.alert('Error!', resData.status);
    }
  } catch (error) {
    console.log(error);
    setShowPreloader(false);
    Alert.alert('Error!', 'Something went wrong please try again');
  }
};

export {goOfflineOrOnline};

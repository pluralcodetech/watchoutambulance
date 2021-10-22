import 'react-native-gesture-handler';
import React from 'react';
import {StyleProvider} from 'native-base';
import {Provider} from 'react-redux';
import getTheme from './native-base-theme/components';
import commonColors from './native-base-theme/variables/commonColor';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './app/src/view/screens/authScreens/SignInScreen';
import SplashScreen from './app/src/view/screens/SplashScreen';
import {StatusBar} from 'react-native';
import COLORS from './app/src/styles/colors';
import OtpScreen from './app/src/view/screens/authScreens/OtpScreen';
import HomeScreen from './app/src/view/screens/HomeScreen';
import Store from './app/src/redux/store';
import {dispatchUserDataToStore} from './app/src/logics/auth';
import BottomTabNavigator from './app/src/view/navigations/BottomTabNavigator';

const Stack = createStackNavigator();
const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [showSplashScreen, setSplashScreen] = React.useState(true);

  Store.subscribe(() => {
    const userLoggedIn = Store.getState().userData.loggedIn;
    setLoggedIn(userLoggedIn);
  });
  React.useEffect(() => {
    dispatchUserDataToStore();
  }, []);

  React.useEffect(() => {
    //hide splash screen 3 sec after the loggedIn value is changed
    setTimeout(() => {
      setSplashScreen(false);
    }, 3000);
  }, [loggedIn]);

  return (
    <Provider store={Store}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      {showSplashScreen && <SplashScreen />}
      <StyleProvider style={getTheme(commonColors)}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {!loggedIn ? (
              <>
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
                <Stack.Screen name="OtpScreen" component={OtpScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Home" component={BottomTabNavigator} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </StyleProvider>
    </Provider>
  );
};

export default App;

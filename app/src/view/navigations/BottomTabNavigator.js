import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {View, Text, Icon} from 'native-base';
import {TouchableOpacity, StyleSheet} from 'react-native';
import COLORS from '../../styles/colors';
import FONTS from '../../conts/fonts';
import CaseDetailsScreen from '../screens/CaseDetailsScreen';
import CaseRecordsScreen from '../screens/CaseRecordsScreen';
import {goOfflineOrOnline} from '../../logics/homeLogics';
import {useSelector} from 'react-redux';
import PreLoader from '../components/loaders/PreLoader';

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  const [showPreloader, setShowPreloader] = React.useState(false);
  const {data, code} = useSelector(state => state.userData);
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{flexDirection: 'row', height: 65}}>
      <PreLoader visible={showPreloader} />
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const Tab = () => {
          const tabColor =
            label == 'HomeScreen' ? COLORS.secondary : COLORS.primary;
          //Only show tabs for two screens
          if (label == 'HomeScreen') {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  goOfflineOrOnline({...data, code}, setShowPreloader)
                }
                style={[
                  styles.tabContainer,
                  {
                    backgroundColor:
                      data?.is_online?.toLowerCase() == 'yes'
                        ? COLORS.secondary
                        : COLORS.grey,
                  },
                ]}>
                <Icon
                  name={
                    data?.is_online?.toLowerCase() == 'yes'
                      ? 'online-prediction'
                      : 'not-interested'
                  }
                  type="MaterialIcons"
                  style={{color: COLORS.white, fontSize: 25}}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.white,
                    fontFamily: FONTS.bold,
                  }}>
                  {data?.is_online?.toLowerCase() == 'yes'
                    ? 'GO OFFLINE'
                    : 'GO ONLINE'}
                </Text>
              </TouchableOpacity>
            );
          } else if (label == 'CaseRecordsScreen') {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={[styles.tabContainer, {backgroundColor: tabColor}]}>
                <Icon
                  name="medical-services"
                  type="MaterialIcons"
                  style={{color: COLORS.white, fontSize: 25}}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.white,
                    fontFamily: FONTS.bold,
                  }}>
                  CASE RECORD
                </Text>
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        };

        return <Tab key={index} />;
      })}
    </View>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="CaseDetailsScreen" component={CaseDetailsScreen} />
      <Tab.Screen name="CaseRecordsScreen" component={CaseRecordsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabNavigator;

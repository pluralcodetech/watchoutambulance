import {Body, Button, Header, Icon, Left, Right, Text} from 'native-base';
import React from 'react';
import {Image} from 'react-native';
import FONTS from '../../../conts/fonts';
import {logoutUser} from '../../../logics/auth';
import COLORS from '../../../styles/colors';
import {useNavigation} from '@react-navigation/native';

const AppHeader = ({data}) => {
  const navigation = useNavigation();
  return (
    <Header>
      <Left>
        <Image
          source={require('../../../assets/driver.png')}
          style={{height: 40, width: 40, marginLeft: 10}}
        />
      </Left>
      <Body>
        <Text style={{fontFamily: FONTS.bold}}>{data.name}</Text>
        <Text style={{fontSize: 14}}>NG Ambulance Services</Text>
      </Body>
      <Right>
        <Icon
          onPress={() => navigation.navigate('HomeScreen')}
          name="home"
          type="MaterialIcons"
          style={{color: COLORS.primary, marginRight: 10}}
        />
        <Button
          small
          rounded
          style={{backgroundColor: COLORS.secondary}}
          onPress={logoutUser}>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>Logout</Text>
        </Button>
      </Right>
    </Header>
  );
};

export default AppHeader;

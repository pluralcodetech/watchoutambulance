import React from 'react';
import {Modal, Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import COLORS from '../../../styles/colors';

const PreLoader = ({visible, message = 'Loading...'}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
        <View
          style={{
            height: 80,
            backgroundColor: '#fff',
            width: '80%',
            alignItems: 'center',
            borderRadius: 5,
            flexDirection: 'row',
          }}>
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{marginLeft: 20, marginRight: 15}}
          />
          <Text style={{fontSize: 14, fontWeight: '100'}}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default PreLoader;

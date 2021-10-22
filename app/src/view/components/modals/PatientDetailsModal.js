import {View, Icon, Text} from 'native-base';
import React from 'react';
import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import COLORS from '../../../styles/colors';
import globalStyles from '../../../styles/styles';
const {width} = Dimensions.get('screen');

const PatientDetailsModal = ({visible, patientDetails, setPatientDetails}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Icon
              name="close"
              style={{fontSize: 28}}
              onPress={() => setPatientDetails({show: false})}
            />
          </View>

          {patientDetails?.passengerName != '' ? (
            <View>
              <Text
                style={[
                  globalStyles.cardTitle,
                  {color: COLORS.primary, textAlign: 'center', fontSize: 15},
                ]}>
                {patientDetails?.passengerName?.toUpperCase()}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `tel:+${patientDetails.countryCode}${patientDetails?.phone}`,
                  )
                }>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 15,
                    textAlign: 'center',
                  }}>
                  {`+${patientDetails.countryCode}${patientDetails?.phone}`}
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  marginBottom: 10,
                  color: COLORS.primary,
                  fontSize: 14,
                  textAlign: 'center',
                }}>
                Trip Id: {patientDetails?.trip_id}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  color: COLORS.black,
                  fontSize: 16,
                }}>
                Residence:{' '}
                {patientDetails?.address + ' ' + patientDetails?.city}
              </Text>
              <View style={styles.modalLine} />

              <Text
                style={{
                  marginTop: 10,
                  color: COLORS.black,
                  fontSize: 16,
                }}>
                Medical:{patientDetails?.medical_records}
              </Text>
              <View style={styles.modalLine} />

              <Text
                style={{
                  marginTop: 10,
                  color: COLORS.black,
                  fontSize: 16,
                }}>
                Next of kin:{patientDetails?.next_of_kin_name} (
                {patientDetails?.next_of_kin_phone})
              </Text>
            </View>
          ) : (
            <Text>Details Not Found.</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modal: {
    borderRadius: 10,
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  modalLine: {
    backgroundColor: COLORS.black,
    height: 0.5,
    marginTop: 5,
    width: width * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 20,
  },
});

export default PatientDetailsModal;

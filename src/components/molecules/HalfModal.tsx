import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {ColorPicker} from 'react-native-color-picker';
import Modal from 'react-native-modal';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface HalfModalProps {
  isVisible: boolean;
  onClose: () => void;
  onColorChange: () => void;
}

export const HalfModal: React.FC<HalfModalProps> = ({
  isVisible,
  onClose,
  onColorChange,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver={true}>
      <View style={styles.modalContent}>
        <ColorPicker
          onColorChange={onColorChange}
          style={{width: 300, height: 300}}
          hideSliders={false}
          defaultColor={'white'}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    minHeight: hp('45%'),
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'blue',
  },
});

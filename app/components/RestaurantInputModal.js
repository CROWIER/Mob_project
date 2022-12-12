import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

const RestaurantInputModal = ({ visible, onClose, onSubmit, restaurant, isEdit }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [tags, setTags] = useState('');
  const [rate, setRate] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setName(restaurant.name);
      setAddress(restaurant.address);
      setPhone(restaurant.phone);
      setTags(restaurant.tags);
      setRate(restaurant.rate)
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'name') setName(text);
    if (valueFor === 'address') setAddress(text);
    if (valueFor === 'phone') setPhone(text);
    if (valueFor === 'tags') setTags(text);
    if (valueFor === 'rate') setRate(text);
    

  };

  const handleSubmit = () => {
    if (!name.trim() && !address.trim()) return onClose();

    if (isEdit) {
      onSubmit(name, address, phone, tags, rate);
    } else {
      onSubmit(name, address, phone, tags, rate);
      setName('');
      setAddress('');
      setPhone('');
      setTags('');
      setRate('')
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setName('');
      setAddress('');
      setPhone('');
      setTags('');
      setRate('');
    }
    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
          <TextInput
            value={name}
            onChangeText={text => handleOnChangeText(text, 'name')}
            placeholder='Name'
            style={[styles.input, styles.name]}
          />
          <TextInput
            value={address}
            multiline
            placeholder='Address'
            style={[styles.input, styles.fields]}
            onChangeText={text => handleOnChangeText(text, 'address')}
          />
           <TextInput
            value={phone}
            multiline
            placeholder='Phone'
            style={[styles.input, styles.fields]}
            onChangeText={text => handleOnChangeText(text, 'phone')}
          />
           <TextInput
            value={tags}
            multiline
            placeholder='Tags'
            style={[styles.input, styles.fields]}
            onChangeText={text => handleOnChangeText(text, 'tags')}
          />
           <TextInput
            value={rate}
            multiline
            keyboardType='numeric'
            placeholder='Rate'
            style={[styles.input, styles.fields]}
            onChangeText={text => handleOnChangeText(text, 'rate')}
          />
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={15}
              antIconName='check'
              onPress={handleSubmit}
            />
            {name.trim() || address.trim() ? (
              <RoundIconBtn
                size={15}
                style={{ marginLeft: 15 }}
                antIconName='close'
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  name: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  fields: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

export default RestaurantInputModal;

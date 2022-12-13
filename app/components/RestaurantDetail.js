import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, Platform, Linking } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRestaurant } from '../contexts/RestaurantProvider';
import RestaurantsInputModal from './RestaurantInputModal';

const openGoogleMapApp = (addr) => {
    if (Platform.OS === 'android') {
        Linking.openURL(`https://www.google.com/maps/place/${addr}`);
    }else{
        Linking.openURL(`https://www.google.com/maps/place/${addr}`);
    }
};

const navMapApp = (addr) => {
    if (Platform.OS === 'android') {
        Linking.openURL(`google.navigation:q=${addr}`);
    }else{
        Linking.openURL(`http://maps.apple.com/?daddr=${addr}`)
    }
};

const RestaurantDetail = props => {
  const [restaurant, setRestaurant] = useState(props.route.params.restaurant);
  const headerHeight = useHeaderHeight();
  const { setRestaurants } = useRestaurant();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteRestaurant = async () => {
    const result = await AsyncStorage.getItem('restaurants');
    let restaurants = [];
    if (result !== null) restaurants = JSON.parse(result);

    const newRestaurants = restaurants.filter(n => n.id !== restaurant.id);
    setRestaurants(newRestaurants);
    await AsyncStorage.setItem('restaurants', JSON.stringify(newRestaurants));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure!',
      'This action will delete your note permanently!',
      [
        {
          text: 'Delete',
          onPress: deleteRestaurant,
        },
        {
          text: 'No Thanks',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleUpdate = async (name, address, phone, tags, rate, description) => {
    const result = await AsyncStorage.getItem('restaurants');
    let restaurants = [];
    if (result !== null) restaurants = JSON.parse(result);

    const newRestaurants = restaurants.filter(n => {
      if (n.id === restaurant.id) {
        n.name = name;
        n.address = address;
        n.phone = phone;
        n.tags = tags;
        n.rate = rate;
        n.description = description;
        n.isUpdated = true;

        setRestaurant(n);
      }
      return n;
    });

    setRestaurants(newRestaurants);
    await AsyncStorage.setItem('restaurants', JSON.stringify(newRestaurants));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };
  let mailBody = ("Name: " + restaurant.name + "\nAddress: " + restaurant.address + "\nPhone number: " + restaurant.phone + "\nRating: " + restaurant.rate).replace(/['"]+/g, '')

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.fields}>{restaurant.address}</Text>
        <Text style={styles.fields}>Phone Number: {restaurant.phone}</Text>
        <Text style={styles.fields}>Tag: {restaurant.tags}</Text>
        <Text style={styles.fields}>Rating: {restaurant.rate}</Text>
        <Text style={styles.fields}>Description: {restaurant.description}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName='delete'
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn antIconName='edit' onPress={openEditModal} />
        <RoundIconBtn antIconName='home'
        style={{ marginTop: 15 }}
         onPress={() =>openGoogleMapApp(restaurant.address)} />
         <RoundIconBtn antIconName='right'
        style={{ marginTop: 15 }}
         onPress={() =>navMapApp(restaurant.address)} />
        <RoundIconBtn style={{ marginTop: 15 }} antIconName='mail' onPress={() => Linking.openURL('mailto:?subject=Check+this+restaurant!&body=' + mailBody)} title="" />
      </View>
      <RestaurantsInputModal
        isEdit={isEdit}
        restaurant={restaurant}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  fields: {
    fontSize: 20,
    opacity: 0.6,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default RestaurantDetail;

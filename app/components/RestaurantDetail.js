import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRestaurant } from '../contexts/RestaurantProvider';
import RestaurantsInputModal from './RestaurantInputModal';


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

  const handleUpdate = async (name, address, phone, tags, rate) => {
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

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.fields}>{restaurant.address}</Text>
        <Text style={styles.fields}>{restaurant.phone}</Text>
        <Text style={styles.fields}>{restaurant.tags}</Text>
        <Text style={styles.fields}>{restaurant.rate}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName='delete'
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn antIconName='edit' onPress={openEditModal} />
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
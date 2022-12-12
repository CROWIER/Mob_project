import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList,
} 
from 'react-native';
import Restaurant from '../components/Restaurant';
import RestaurantInputModal from '../components/RestaurantInputModal';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import { useRestaurant } from '../contexts/RestaurantProvider';
import colors from '../misc/colors';
import Constants from 'expo-constants';
import uuid from 'react-native-uuid';


const RestaurantScreen = ({ user, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { restaurants, setRestaurants, findRestaurants } = useRestaurant();

  const handleOnSubmit = async (name, address, phone, tags, rate ) => {
    const restaurant = { id: uuid.v4(), name, address, phone, tags, rate};
    const updatedRestaurants = [...restaurants, restaurant];
    setRestaurants(updatedRestaurants);
    await AsyncStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  const openRestaurants = restaurant => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
   
      return await findRestaurants();
    }
    const filteredRestaurants = restaurants.filter(restaurant => {
      if (restaurant.name.toLowerCase().includes(text.toLowerCase())) {
        return restaurant;
      }
    });

    if (filteredRestaurants.length) {
      setRestaurants([...filteredRestaurants]);
    } 
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    await findRestaurants();
  };

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {restaurants.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginVertical: 10 }}
              onClear={handleOnClear}
            />
          ) : null}
            <FlatList
              data={restaurants}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Restaurant onPress={() => openRestaurants(item)} item={item} />
              )}
            />
         

          
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn
        onPress={() => setModalVisible(true)}
        antIconName='plus'
        style={styles.addBtn}
      />
      <RestaurantInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
    zIndex: 1,
  },
});

export default RestaurantScreen;

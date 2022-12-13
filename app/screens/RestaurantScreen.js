import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList,
} from 'react-native';
import NotFound from '../components/NotFound'
import Restaurant from '../components/Restaurant';
import RestaurantInputModal from '../components/RestaurantInputModal';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import { useRestaurant } from '../contexts/RestaurantProvider';
import colors from '../misc/colors';
import Constants from 'expo-constants';
import uuid from 'react-native-uuid';
import AboutScreen from './AboutScreen'


const RestaurantScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { restaurants, setRestaurants, findRestaurants } = useRestaurant();
  const [resultNotFound, setResultNotFound] = useState(false);
  const handleOnSubmit = async (name, address, phone, tags, rate, description ) => {
    const restaurant = { id: uuid.v4(), name, address, phone, tags, rate, description};
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
      setResultNotFound(false);
      return await findRestaurantss();
    }
    const filteredRestaurants = restaurants.filter(restaurant => {
      if (restaurant.address.toLowerCase().includes(text.toLowerCase()) ||restaurant.tags.toLowerCase().includes(text.toLowerCase())) {
        return restaurant;
      }
    });

    if (filteredRestaurants.length) {
      setRestaurants([...filteredRestaurants]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
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
          {resultNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              data={restaurants}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Restaurant onPress={() => openRestaurants(item)} item={item} />
              )}
            />
            )}
         

          
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn
        onPress={() => setModalVisible(true)}
        antIconName='plus'
        style={styles.addBtn}
      />
      <RoundIconBtn style={styles.infoBtn} antIconName='info' onPress={() => navigation.navigate(AboutScreen)} />
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
    bottom: 130,
    zIndex: 1,
  },
  infoBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
    zIndex: 1,
  }
});

export default RestaurantScreen;

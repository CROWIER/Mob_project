import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const RestaurantContext = createContext();
const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);

  const findRestaurants = async () => {
    const result = await AsyncStorage.getItem('restaurants');
    if (result !== null) setRestaurants(JSON.parse(result));
  };

  useEffect(() => {
    findRestaurants();
  }, []);

  return (
    <RestaurantContext.Provider value={{ restaurants, setRestaurants, findRestaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);

export default RestaurantProvider;

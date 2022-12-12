import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import colors from '../misc/colors';

const Restaurant = ({ item, onPress }) => {
  const { name, address, phone, description, tax } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <Text numberOfLines={3}>{address}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    padding:20,
    marginVertical:8,
    marginHorizontal:16,
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.LIGHT,
    shadowColor: '#171717',
  },
});

export default Restaurant;

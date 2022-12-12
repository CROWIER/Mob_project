import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AboutScreen from './app/screens/AboutScreen'
import RestaurantScreen from './app/screens/RestaurantScreen';
import RestaurantDetail from './app/components/RestaurantDetail';
import RestaurantProvider from './app/contexts/RestaurantProvider';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <RestaurantProvider>
        <Stack.Navigator
          screenOptions={{ headerTitle: '', headerTransparent: true }}
        >
          <Stack.Screen component={RestaurantScreen} name='RestaurantScreen' />
          <Stack.Screen component={RestaurantDetail} name='RestaurantDetail' />
          <Stack.Screen component={AboutScreen} name='AboutScreen' />
        </Stack.Navigator>
      </RestaurantProvider>
    </NavigationContainer>
  );
}



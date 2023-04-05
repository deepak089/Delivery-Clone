import * as React from 'react';
import { View, Text } from 'react-native';
import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.js';
import RestaurantScreen from './screens/RestaurantScreen.js';
import { Provider } from 'react-redux'
import { store } from './redux/store/Store.js';
import BasketScreen from './screens/BasketScreen.js';
import PreparingOrderScreen from './screens/PreparingOrderScreen.js';
import DeliveryScreen from './screens/DeliveryScreen.js';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="Basket" component={BasketScreen} 
        screenOptions={{ presentation:"modal",headerShown:false}}/>

        <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} 
        screenOptions={{ presentation:"modal",headerShown:false}}/>

      <Stack.Screen name="delivery" component={DeliveryScreen} 
        screenOptions={{ presentation:"modal",headerShown:false}}/>
     
     </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}



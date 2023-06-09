import { StyleSheet, TouchableOpacity, SafeAreaView, Text, View, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../redux/features/RestaurantSlice';
import { XMarkIcon } from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50 mt-10">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}>
            <XMarkIcon size={30} color="white" />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">
                Estimated Arrival
              </Text>
              <Text className="text-4xl font-bold">
                45-55 Minutes
              </Text>
            </View>
            <Image source={{
              uri: 'https://links.papareact.com/fls'
            }}
              className="h-20 w-20" />
          </View>

          <Progress.Bar size={30} color='#00CCBB' indeterminate={true} />
          <Text className="mt-3 text-gray-500">
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      
      <MapView
        className='flex-1 -mt-10 z-0'
        initialRegion={{
          latitude: 29.854363,
          longitude: 	77.8881,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker 
         coordinate={{
          latitude: 29.854363,
          longitude: 	77.8881,
         }}
         pinColor='#00CCBB'
         title={restaurant?.title}
         description={restaurant?.short_description}
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 p-4">
        <Image 
         source={{
          uri:'https://links.papareact.com/wru'
         }}
         className="h-12 w-12 bg-gray-400 p-4 rounded-full ml-5"
         />
         <View className="flex-1">
           <Text className="text-lg">Deepak Chandra</Text>
           <Text className="text-gray-400">Your Rider</Text>
         </View>
         <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen

const styles = StyleSheet.create({})
import { ScrollView, StyleSheet, Image, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../redux/features/RestaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../redux/features/BasketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import { CurrencyRupeeIcon } from 'react-native-heroicons/outline';

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const [groupedItemsInBasket, setgroupedItemsInBasket] = useState([]);
  const BasketTotal = useSelector(selectBasketTotal)
  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setgroupedItemsInBasket(groupedItems);
  }, [items])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-white mt-10">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">
              Basket
            </Text>
            <Text className="text-center text-gray-400">{restaurant?.title}</Text>

          </View>
          <TouchableOpacity onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color='#00CCBB' height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 py-3 px-3 bg-white my-3">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 bg-gray-300 rounded-full" />
          <Text className="flex-1">
            Deliver in 50-75 Min
          </Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => {
            return (<View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text className="text-[#00CCBB]">
                {items.length} x
              </Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">
                {items[0]?.name}
              </Text>

              <View className="flex-row">
                <CurrencyRupeeIcon size={20} color="#00CCBB" />
                <Text>{items[0]?.price}</Text>
              </View>
              <TouchableOpacity >
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
            )
          })}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <View className="flex-row text-gray-400">
              <CurrencyRupeeIcon size={20} color="#00CCBB" />
              <Text>{BasketTotal}</Text>
            </View>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <View className="flex-row text-gray-400">
              <CurrencyRupeeIcon size={20} color="#00CCBB" />
              <Text>{BasketTotal} + 5.99</Text>
            </View>
          </View>
          <TouchableOpacity 
           onPress={()=> navigation.navigate('PreparingOrder')}
          className="rounded-lg bg-[#00CCBB] p-4">
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>
        </View>


      </View>
    </SafeAreaView>
  )
}

export default BasketScreen

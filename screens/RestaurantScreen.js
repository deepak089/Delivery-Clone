import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useLayoutEffect ,useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity';
import { ArrowLeftIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { StarIcon } from 'react-native-heroicons/solid';
import { ChevronRightIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../redux/features/RestaurantSlice';

const RestaurantScreen = () => {
    const navigation = useNavigation();
    const dispatch=useDispatch();
    const { params: {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat
    } } = useRoute();

    useEffect(() => {
      dispatch(setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
      }))
    }, [])
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
    return (
        <>
            <BasketIcon />
            
            <ScrollView>
                <View className="relative">
                    <Image
                        source={{ uri: urlFor(imgUrl).url() }}
                        className="w-full h-56 bg-gray-300 p-4 " />

                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="absolute top-14 left-5 p-2 bg-gray-200 rounded-full">
                        <ArrowLeftIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <View className="bg-white">
                    <View className="px-4 pt-4">
                        <Text className="text-3xl font-bold">{title}</Text>
                        <View className="flex-row space-x-2 my-1">
                            <View className="flex-row items-center space-x-1">
                                <StarIcon size={22} opacity={0.5} color="green" />
                                <Text>{rating} . {genre}</Text>
                            </View>

                            <View className="flex-row items-center space-x-1">
                                <MapPinIcon color='gray' opacity={0.4} size={22} />
                                <Text className="text-xs text-gray-500">Nearby . {address}</Text>

                            </View>
                        </View>
                        <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
                    </View>

                    <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
                        <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
                        <Text className="pl-2 flex-1 text-md font-bold">
                            Have Food Allergy?
                        </Text>
                        <ChevronRightIcon color="#00CCBB" />
                    </TouchableOpacity>
                </View>

                <View className="pb-36">
                    <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
                    {/* Dish rows */}
                    {dishes.map((dish) => {
                        return (<DishRow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />)
                    })}
                </View>
            </ScrollView>
        </>

    )
}

export default RestaurantScreen

const styles = StyleSheet.create({})
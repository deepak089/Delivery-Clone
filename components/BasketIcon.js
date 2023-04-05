import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../redux/features/BasketSlice'
import { useNavigation } from '@react-navigation/native'
import { CurrencyEuroIcon } from 'react-native-heroicons/outline'

const BasketIcon = () => {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const BasketTotal = useSelector(selectBasketTotal);

    if(items.length === 0) return ;

    return (
        <View className="absolute bottom-10 w-full z-50">
            <TouchableOpacity 
            onPress={() => navigation.navigate('Basket')} 
            className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1">
                <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
                    {items.length}
                </Text>
                <Text className="flex-1 text-white font-extrabold text-lg text-center">
                    View Basket
                </Text>
                <View className="text-lg text-white flex-row items-center font-extrabold">
                    <CurrencyEuroIcon size={20} color="white"/>
                    <Text className="text-lg text-white mx-1">
                        {BasketTotal}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default BasketIcon

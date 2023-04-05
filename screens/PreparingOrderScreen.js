import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect ,useEffect} from 'react'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress'; 
const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(()=>{
        setTimeout(() => {
            navigation.navigate('delivery');
        }, 1000);
    })
    return (
        <SafeAreaView className="flex-1 bg-[#00CCBB] justify-center  items-center">
            <Animatable.Image
                source={require('../assets/take.png')}
                anination='slideInUp'
                iterationCount={1}
                className="h-96 w-96" />

            <Animatable.Text
                animation='slideInUp'
                iterationCount={1}
                className="text-lg my-10 text-white font-bold text-center">
                Waiting for Restaurant to accept your order!!!
            </Animatable.Text>

            <Progress.Circle size={60} indeterminate={true} color="white" />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen

const styles = StyleSheet.create({})
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import client from '../sanity';

const FeaturedRow = ({ id, title, description }) => {
    const [restaurant, setRestaurant] = useState([]);
    useEffect(() => {
        client.fetch(`
      *[_type == "featured" && _id == $id]{
          ...,
          restaurants[]->{
          ...,
          dishes[]->,
          type-> {
             name
          }
        },
      }[0]`,
            { id }).then((data) => setRestaurant(data?.restaurants));
    }, [])
    
    return (
        <View>
            <View className="mt-4 flex-row items-center justify-between px-4">
                <Text className="font-bold text-lg">{title}</Text>
                <ArrowRightIcon color="#00CCBB" />
            </View>

            <Text className="text-xs text-gray-500 px-4">{description}</Text>

            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
                showsHorizontalScrollIndicator={false}
                className="pt-4"
            >
                {/* Restaurant */}
                {
                    restaurant && restaurant?.map((res) => {
                        return (<RestaurantCard
                            key={res._id}
                            id={res._id}
                            imgUrl={res?.image}
                            title={res.name}
                            rating={res.rating}
                            genre={res.type?.name}
                            address={res.address}
                            short_description={res.short_description}
                            dishes={res.dishes}
                            long={res.long}
                            lat={res.lat}
                        />
                        )
                    })
                }

            </ScrollView>
        </View>
    )
}

export default FeaturedRow

const styles = StyleSheet.create({})
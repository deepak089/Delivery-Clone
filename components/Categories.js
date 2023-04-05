import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import client from '../sanity';

const Categories = () => {
    const [categories, setCategories] = useState();

    useEffect(() => {
        client.fetch(`
        *[_type == "category"]`).then((data) => setCategories(data));
    }, [])

    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10
            }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {/* CategoryCard */}

            {categories && categories.map((cat) => {
                return (<CategoryCard
                        key={cat._id}
                        imgUrl={cat.image}
                        title={cat.name} />)
            })}
          
        </ScrollView>
    )
}

export default Categories

const styles = StyleSheet.create({})
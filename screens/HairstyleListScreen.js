import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, View, StyleSheet, Dimensions, Pressable } from 'react-native'
import { images_hairstyle } from '../hairimages';


const HairstyleListScreen = ({ navigation }) => {

  const handleImageClick = (item) => {  
    console.log('selected hairstyle:'+item.path);
    navigation.navigate('Result')
  };

  return (
    <View>
      <FlatList
        numColumns={2}
        data={images_hairstyle}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={ () => handleImageClick(item) }>
            <Image source={ item.uri } style={styles.image} />
          </Pressable>
        )}
      />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width / 2 - 20,
    height: 200,
    margin: 5,
  },
});

export default HairstyleListScreen

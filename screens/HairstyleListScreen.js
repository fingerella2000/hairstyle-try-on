import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, View, StyleSheet, Dimensions, Pressable } from 'react-native'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { images_hairstyle } from '../hairimages';


const HairstyleListScreen = ({ navigation }) => {

  return (
    <View>
      <FlatList
        numColumns={2}
        data={images_hairstyle}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={ () => navigation.navigate('Result') }>
            <Image source={ item } style={styles.image} />
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
    margin: 10,
  },
});

export default HairstyleListScreen

import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../firebase'
import Button from '../components/Button';
import ImageViewer from '../components/ImageViewer';

const PlaceholderImage = require('../assets/demo/demo.png');

const HomeScreen = ({ navigation }) => {
  // const navigation = useNavigation()

  const handleSignOut = (navigation) => {
    auth
      .signOut()
      .then(() => {
        console.log('user logged out')
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }

  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer 
          placeholderImageSource={PlaceholderImage} 
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a portrait" onPress={pickImageAsync} />
        <Button label="Choose a hairstyle" onPress={() => navigation.navigate('Hairstyles')}/>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 30,
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center',
  },
})
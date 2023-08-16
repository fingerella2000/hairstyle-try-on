import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { getAccessToken, blendHair } from '../mlrequest';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';


const ResultScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <View style={styles.container}>
      <Text>Due to the limited resource we currently, your request was sent in queue, we will notify you when when the new hairstyle image is generated.</Text>
   </View>
  )
}

export default ResultScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
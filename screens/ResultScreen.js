import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Image, Text, View, StyleSheet, Pressable } from 'react-native'


const ResultScreen = ({ navigation }) => {

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
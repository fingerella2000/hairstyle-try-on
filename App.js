import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as MediaLibrary from 'expo-media-library';
import 'react-native-gesture-handler';
import Routes from './screens/index';

const Stack = createStackNavigator();

export default function App() {
  // ask user's consent for accessing phtotos
  const [status, requestPermission] = MediaLibrary.usePermissions();
  
  if (status === null) {
    requestPermission();
  }

  return (
    <Routes />
  );
}

const styles = StyleSheet.create({
});


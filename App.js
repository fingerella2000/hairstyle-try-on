import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as MediaLibrary from 'expo-media-library';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import HairstyleListScreen from './screens/HairstyleListScreen';
import ResultScreen from './screens/ResultScreen';
import 'react-native-gesture-handler';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { AuthenticatedUserProvider } from './screens/AuthenticatedUserProvider';
import { RootNavigator } from './screens/RootNavigator';
import Routes from './screens/index';

const Stack = createStackNavigator();

export default function App() {
  // ask user's consent for accessing phtotos
  const [status, requestPermission] = MediaLibrary.usePermissions();
  
  if (status === null) {
    requestPermission();
  }

  // Set an initializing state whilst Firebase connects
  const [user, setUser] = useState();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="Hairstyles" component={HairstyleListScreen} />
    //     <Stack.Screen name="Result" component={ResultScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <Routes />
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});


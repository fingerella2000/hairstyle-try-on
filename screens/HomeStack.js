import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HairstyleListScreen from './HairstyleListScreen';
import ResultScreen from './ResultScreen';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name="Hairstyles" component={HairstyleListScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
}
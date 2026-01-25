import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importamos tus pantallas
import SelectionScreen from './SelectionScreen';
import GameScreen from './GameScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Selection"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
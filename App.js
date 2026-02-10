import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



// Importamos tus pantallas
import SelectionScreen from './SelectionScreen';
import GameScreen from './GameScreen';
import MatchScreen from './MatchScreen';
import WinnerScreen from './WinnerScreen';

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
        <Stack.Screen name="Match" component={MatchScreen} />   
        <Stack.Screen name="Winner" component={WinnerScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

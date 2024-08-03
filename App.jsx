import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './Pages/Index';
import DataScreen from './Pages/DataScreen';
import { useContext,createContext } from 'react';


// const  createContext()

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    // <Index/>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name='Home' component={Index}/>
        <Stack.Screen name='Manav' component={DataScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
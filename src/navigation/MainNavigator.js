import {Text} from 'react-native';
import React from 'react';  
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminNavigator from './AdminNavigator';

const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="AdminNavigator" component={AdminNavigator} /> 
        </Stack.Navigator>
    </NavigationContainer>
    
  );
}
export default MainNavigator;
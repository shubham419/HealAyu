import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import UserTypeScreen from '../screens/UserTypeScreen';
import OtpScreen from '../screens/OtpScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer independent>
    <Stack.Navigator>
      <Stack.Screen name="PhoneNumberScreen" options={{ headerShown: false }} component={PhoneNumberScreen} />
      <Stack.Screen name="OtpScreen" options={{ headerShown: false }} component={OtpScreen} />
      <Stack.Screen name="UserTypeScreen" options={{ headerShown: false }} component={UserTypeScreen} />
      <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} component={RegisterScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AuthNavigation
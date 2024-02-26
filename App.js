import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation from "./src/module/auth/navigation/AuthNavigation";
import RootComponent from "./src/module/root/RootComponent";
import { RootSiblingParent } from "react-native-root-siblings";
import { useEffect, useState } from "react";
import PhoneNumberScreen from "./src/module/auth/screens/PhoneNumberScreen";
import UserTypeScreen from "./src/module/auth/screens/UserTypeScreen";
import OtpScreen from "./src/module/auth/screens/OtpScreen";
import RegisterScreen from "./src/module/auth/screens/RegisterScreen";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();


export default function App() {
  // const [initialRoute, setInitialRoute] = useState("PhoneNumberScreen");
  
  // async function getUser() {
  //   try {
  //     const uid = await AsyncStorage.getItem('UID');

  //     if (uid !== null) {
  //         setInitialRoute("Root");
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log(error)
  //   }  };
  
  // useEffect(() => {
  //   getUser();
  // }, []);
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          // initialRouteName="RegisterScreen"
        >
          <Stack.Screen
            name="PhoneNumberScreen"
            component={PhoneNumberScreen}
          />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
          <Stack.Screen name="UserTypeScreen" component={UserTypeScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

          <Stack.Screen
            name="Root"
            options={{ headerShown: false }}
            component={RootComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

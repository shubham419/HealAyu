import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation from "./src/module/auth/navigation/AuthNavigation";
import RootComponent from "./src/module/root/navigation/RootComponent";
import { RootSiblingParent } from "react-native-root-siblings";
import { useEffect, useState } from "react";
import PhoneNumberScreen from "./src/module/auth/screens/PhoneNumberScreen";
import UserTypeScreen from "./src/module/auth/screens/UserTypeScreen";
import OtpScreen from "./src/module/auth/screens/OtpScreen";
import RegisterScreen from "./src/module/auth/screens/RegisterScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import AuthContext from "./src/utils/AuthContext";
import { PaperProvider } from "react-native-paper";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);

  async function getUser() {
    try {
      const uid = await AsyncStorage.getItem("uid");
      console.log(uid);
      if (uid !== null) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      await SplashScreen.hideAsync();
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <PaperProvider>
      <RootSiblingParent>
        <AuthContext.Provider value={setIsSignedIn}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName=""
            >
              {isSignedIn ? (
                <Stack.Screen
                  name="Root"
                  options={{ headerShown: false }}
                  component={RootComponent}
                />
              ) : (
                <Stack.Group>
                  <Stack.Screen
                    name="PhoneNumberScreen"
                    component={PhoneNumberScreen}
                  />
                  <Stack.Screen name="OtpScreen" component={OtpScreen} />
                  <Stack.Screen
                    name="UserTypeScreen"
                    component={UserTypeScreen}
                  />
                  <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                  />
                </Stack.Group>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      </RootSiblingParent>
    </PaperProvider>
  );
}

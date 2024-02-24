import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation from "./src/module/auth/navigation/AuthNavigation";
import RootComponent from "./src/module/root/RootComponent";
import { RootSiblingParent } from "react-native-root-siblings";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName=""
        >
          <Stack.Screen
            name="Authentication"
            options={{ headerShown: false }}
            component={AuthNavigation}
          />
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

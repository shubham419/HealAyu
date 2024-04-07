import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootComponent from "./src/module/root/navigation/RootComponent";
import { RootSiblingParent } from "react-native-root-siblings";
import { useEffect, useRef, useState } from "react";
import PhoneNumberScreen from "./src/module/auth/screens/PhoneNumberScreen";
import UserTypeScreen from "./src/module/auth/screens/UserTypeScreen";
import OtpScreen from "./src/module/auth/screens/OtpScreen";
import RegisterScreen from "./src/module/auth/screens/RegisterScreen";
import * as SplashScreen from "expo-splash-screen";
import AuthContext from "./src/utils/AuthContext";
import { PaperProvider } from "react-native-paper";
import { getUser } from "./src/utils/asyncStorage";
import AboutUsScreen from "./src/module/root/screens/profile/AboutScreen";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [userData, setUserData] = useState({});
  const [reload, setReload] = useState(0);

  useEffect(() => {
    getUserData();
    async function getUserData() {
      try {
        const userData = await getUser();
        if (userData !== null) {
          console.log(userData);
          setUserData(userData);
          setIsSignedIn(true);
        } else {
          console.log("not uid present");
          setUserData({});
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
  }, [isSignedIn]);

  return (
    <PaperProvider>
      <RootSiblingParent>
        <AuthContext.Provider
          value={{ setIsSignedIn, userData, reload, setReload }}
        >
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

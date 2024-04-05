import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../../theme/colors";
import SearchScreen from "../screens/search/SearchScreen";
import DoctorDetailScreen from "../screens/search/DoctorDetailScreen";
import AppointmentDetailScreen from "../screens/home/AppointmentDetailScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RootComponent = () => {
  return (
    <Tab.Navigator
      backBehavior="firstRoute"
      screenOptions={{ headerShown: false }}
      activeColor={Colors.main}
      inactiveColor={Colors.subHeading}
      shifting={true}
    >
      <Tab.Screen
        name="HomeBottomBar"
        // component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AppointmentDetailScreen"
              component={AppointmentDetailScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Search Doctor"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
        }}
      >
        {
          () => (
            <Stack.Navigator>
              <Stack.Screen
              name="SearchScreen"
              component={SearchScreen}
              options={{ headerShown: false }}
              />
              <Stack.Screen
              name="DoctorDetailScreen"
              component={DoctorDetailScreen}
              options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )
        }
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootComponent;

const styles = StyleSheet.create({});

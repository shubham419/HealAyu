import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../../../../utils/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const { setIsSignedIn } = useContext(AuthContext);

  const { userData } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="person" size={120} color="black" />
        <Text
          style={styles.name}
        >{`${userData.name} ${userData.lastName}`}</Text>
        <Text style={styles.phoneNumber}>{userData.phone}</Text>
      </View>
      <View style={styles.section}>
        <MaterialIcons name="alternate-email" size={24} color="black" />
        <Text style={styles.value}>{userData.email}</Text>
      </View>

      <TouchableOpacity
        style={styles.section}
        onPress={() => {
          navigation.navigate("About Us");
        }}
      >
        <Ionicons name="information-circle-outline" size={24} color="black" />
        <Text style={styles.value}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.section}
        onPress={() => {
          navigation.navigate("PrivacyPolicyScreen");
        }}
      >
        <Ionicons name="shield-checkmark-outline" size={24} color="black" />
        <Text style={styles.value}>Privacy & Policy </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          AsyncStorage.removeItem("user");
          setIsSignedIn(false);
        }}
      >
        <MaterialIcons name="logout" size={24} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  phoneNumber: {
    fontSize: 18,
    marginTop: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  value: {
    marginLeft: 10,
    fontSize: 18,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

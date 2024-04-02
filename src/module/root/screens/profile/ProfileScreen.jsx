import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../../../../utils/AuthContext";

const ProfileScreen = () => {

  const { setIsSignedIn } = useContext(AuthContext);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="person" size={60} color="black" />
        <Text style={styles.name}>Shubham Thorat</Text>
        <Text style={styles.phoneNumber}>9325290728</Text>
      </View>
      <View style={styles.section}>
        <MaterialIcons name="email" size={24} color="black" />
        <Text style={styles.value}>shubham@example.com</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={ () => {
         AsyncStorage.removeItem("user");
         setIsSignedIn(false);
      }}>
        <MaterialIcons name="logout" size={24} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 18,
    marginTop: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  value: {
    marginLeft: 10,
    fontSize: 18,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
})

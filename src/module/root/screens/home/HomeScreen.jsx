import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import React, { useContext } from "react";
import CustomButton from "../../../../core/components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../../../../utils/AuthContext";
import AppointmentList from "../../components/AppointmentList";

import AppointmentDetailScreen from "./AppointmentDetailScreen";

const HomeScreen = ({}) => {
 

  const { setIsSignedIn } = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View style={styles.cointainer}>
      <AppointmentList /> 
   </View> 
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cointainer: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
});

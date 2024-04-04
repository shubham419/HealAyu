import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import React from "react";
import AppointmentList from "../../components/AppointmentList";

const HomeScreen = ({}) => {
  return (
    <View style={styles.cointainer}>
      <AppointmentList />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cointainer: {
    // marginTop: StatusBar.currentHeight,
    flex: 1,
  },
});

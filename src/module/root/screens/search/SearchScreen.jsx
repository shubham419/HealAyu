import { StyleSheet, View, StatusBar } from "react-native";
import React from "react";
import DoctorList from "./DoctorList";
import { Searchbar } from "react-native-paper";

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Searchbar placeholder="Search" style={{ margin: 6 }} />
      <DoctorList />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
});

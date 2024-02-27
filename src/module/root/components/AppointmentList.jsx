import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "../../../theme/colors";
import database from '@react-native-firebase/database';

const AppointmentList = () => {
  const [selectedTab, setSelectedTab] = useState("Upcoming");

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabText,
            selectedTab === "Upcoming" && styles.selectedTab,
          ]}
          onPress={() => handleTabPress("Upcoming")}
        >
          <Text style={styles.text}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabText,
            selectedTab === "Past" && styles.selectedTab,
          ]}
          onPress={() => handleTabPress("Past")}
        >
          <Text style={styles.text}>Past</Text>
        </TouchableOpacity>
      </View>
      {/* Your appointment list goes here */}
      <View style={styles.appointmentList}>
        {selectedTab === "Upcoming" ? (
          <Text>No upcoming appointments</Text>
        ) : (
          <Text>No past appointments</Text>
        )}
      </View>
    </View>
  );
};

export default AppointmentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  tabText: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  selectedTab: {
    borderBottomColor: Colors.main, // Main theme color for the underline of the selected tab
    backgroundColor: "rgba(238, 75, 43, 0.2)", // Transparent background color
    borderBottomWidth: 2,
  },
  appointmentList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

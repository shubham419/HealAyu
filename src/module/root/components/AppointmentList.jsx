import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Colors from "../../../theme/colors";
import database from "@react-native-firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppointmentCard from "./AppointmentCard";
import AuthContext from "../../../utils/AuthContext";

const AppointmentList = () => {
  console.log("render of appointment list");
  const [selectedTab, setSelectedTab] = useState("Upcoming");
  const [appointmentList, setAppointmentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  // const [userData, setUserData] = useState(null); 
  const {userData} = useContext(AuthContext);


  // console.log(userData);
//   console.log(userData);
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };
  console.log("appointmentList", appointmentList);
  useEffect(() => {
    console.log("useeffect called");
    async function getData(){
      console.log("getdata in appointment list called with uid = " + userData.uid)
        try{
            const snapShot = await database().ref(`users/general/${userData.uid}/appointments`).once("value");
            // console.log(snapShot);
            // console.log(user);
            const temp = [];

            if (snapShot.exists()) {
              snapShot.forEach((item) => {
                if (item) {
                  temp.push(item.val());
                }
                // console.log(item.val());
              });
            }
            // console.log(temp);
            setAppointmentList(temp);
        }catch(e){
            console.log(e);
        }

    } 
    if(userData.uid)
      getData();

  }, [userData]);


  // useEffect(() => {
  //   setUserData(authContext.userData);
  // }, [authContext.userData]);

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
          style={[styles.tabText, selectedTab === "Past" && styles.selectedTab]}
          onPress={() => handleTabPress("Past")}
        >
          <Text style={styles.text}>Past</Text>
        </TouchableOpacity>
      </View>
      {/* Your appointment list goes here */}
      <View style={styles.appointmentList}>
        {appointmentList.length ? 
            appointmentList.map((data, idx) =>{ 
                if(data)
                    return <AppointmentCard key={idx} data={data} />
                return null;
                })
         : (
          <Text>No Appointments data found</Text>
        )}
      </View>
    </View>
  );
};

export default AppointmentList;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: "100%"
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

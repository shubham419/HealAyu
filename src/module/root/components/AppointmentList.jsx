import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Colors from "../../../theme/colors";
import database from "@react-native-firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppointmentCard from "./AppointmentCard";
import AuthContext from "../../../utils/AuthContext";

const AppointmentList = () => {
  const [selectedTab, setSelectedTab] = useState("Upcoming");
  const [appointmentList, setAppointmentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const {userData} = useContext(AuthContext);

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  
  useEffect(() => {
    function createFinalList(){
      if(selectedTab == "Upcoming"){
        const finalList = appointmentList.filter((item) => !(item.status == "completed"));
        setFilteredList(finalList);
      }else{
        const finalList = appointmentList.filter((item) => (item.status == "completed"));
        setFilteredList(finalList);
      }
  
    }
    createFinalList();
  }, [selectedTab, appointmentList])


  useEffect(() => {
    async function getData(){
        try{
            const snapShot = await database().ref(`users/general/${userData.uid}/appointments`).once("value");
            const temp = [];
            if (snapShot.exists()) {
              snapShot.forEach((item) => {
                if (item) {
                  temp.push(item.val());
                }
              });
            }
            setAppointmentList(temp);
        }catch(e){
            console.log(e);
        }

    } 
    if(userData.uid)
      getData();

  }, [userData]);



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
      <View style={styles.appointmentList}>
        {filteredList.length ? 
            filteredList.map((data, idx) =>{ 
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
    borderBottomColor: Colors.main, 
    backgroundColor: "rgba(238, 75, 43, 0.2)",
    borderBottomWidth: 2,
  },
  appointmentList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

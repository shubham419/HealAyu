import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import database from "@react-native-firebase/database";
import AuthContext from "../../../utils/AuthContext";
import ListView from "./ListView";
import {
  TabsProvider,
  Tabs,
  TabScreen,
} from "react-native-paper-tabs";

const AppointmentList = () => {
  const [upcommingList, setUpcommingList] = useState([]);
  const [pastList, setPastList] = useState([]);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    async function getData() {
      try {
        const snapShot = await database()
          .ref(`users/general/${userData.uid}/appointments`)
          .once("value");
        const pastTemp = [];
        const upcommingTemp = [];
        if (snapShot.exists()) {
          snapShot.forEach((item) => {
            if (item) {
              if (item.val().status !== "pending") {
                pastTemp.push(item.val());
              } else {
                upcommingTemp.push(item.val());
              }
            }
          });
        }
        setUpcommingList(upcommingTemp);
        setPastList(pastTemp);
      } catch (e) {
        console.log(e);
      }
    }
    if (userData.uid) getData();
  }, [userData]);

  return (
    <View style={styles.container}>
      <TabsProvider defaultIndex={0}>
        <Tabs>
          <TabScreen label="Upcoming">
            <ListView data={upcommingList} />
          </TabScreen>

          <TabScreen label="Past">
            <ListView data={pastList} />
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
};

export default AppointmentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

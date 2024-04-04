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
          .ref(`users/${userData.isDoctor ? "doctor" : "general"}/${userData.uid}/appointments`)
          .once("value");
        // console.log(snapShot);
        const pastTemp = [];
        const upcommingTemp = [];
        if (snapShot.exists()) {

          // console.log(snapShot.child);
          // console.log("snapshot", snapShot);
          // console.log("key", snapShot.key);

          // for (const key in snapShot.child) {
          //   console.log(key);
          //   const item = snapShot[key];
          //   if (item.status === "pending") {
          //     pastTemp.push({ ...item, id: key });
          //   }else {
          //     upcommingTemp.push({...item, id: key});
          //   }
          // }

          snapShot.forEach((item) => {
            if (item) {
              if (item.val().status == "completed") {
                pastTemp.push({...item.val(), id:item.key});
              } else {
                upcommingTemp.push({...item.val(), id:item.key});
              }
            }
          }
          );
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

import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import database from "@react-native-firebase/database";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../../../theme/colors";
import DoctorCard from "./DoctorCard";

const DoctorList = () => {
  const [docList, serDocList] = useState([]);

  useEffect(() => {
    async function getData() {
      const snapShot = await database().ref("users/doctor").once("value");
      const temp = [];

      if (snapShot.exists()) {
        snapShot.forEach((item) => {
          if (item) {
            temp.push({...item.val().info, id: item.key});
          }
        });
      }
      serDocList(temp);
      console.log(Array.from(snapShot.val()));
    }
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {docList.length ? (
        docList.map((data) => <DoctorCard data={data} />)
      ) : (
        <ActivityIndicator animating={true} color={Colors.main} size={40} />
      )}
    </ScrollView>
  );
};

export default DoctorList;

const styles = StyleSheet.create({
  container: {},
});

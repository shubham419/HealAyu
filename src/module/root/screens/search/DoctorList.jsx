import {
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import database from "@react-native-firebase/database";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../../../theme/colors";
import DoctorCard from "./DoctorCard";

const DoctorList = () => {
  const [docList, serDocList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function getData() {
      const snapShot = await database().ref("users/doctor").once("value");
      const temp = [];

      if (snapShot.exists()) {
        snapShot.forEach((item) => {
          if (item) {
            temp.push({ ...item.val().info, id: item.key });
          }
        });
      }
      serDocList(temp);
    }
    getData();
  }, [loader]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoader((prv) => !prv);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {docList.length ? (
        docList.map((data) => <DoctorCard key={data.id} data={data} />)
      ) : (
        <ActivityIndicator animating={true} color={Colors.main} size={40} />
      )}
    </ScrollView>
  );
};

export default DoctorList;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

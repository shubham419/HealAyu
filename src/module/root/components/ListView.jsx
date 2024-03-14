import { StyleSheet, Text, ScrollView, View } from "react-native";
import React from "react";
import AppointmentCard from "./AppointmentCard";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../../theme/colors";

const ListView = ({data}) => {
  // const data = {
  //     doctorName: "Shubham Thorat",
  //     specialist: "Neurosurgeon",
  //     time: "6:00 PM",
  //     date: "26th Feb",
  //     status: "Confirmed",
  //   };
  // const data = [];
  return (
    <>
      {data.length ? (
        <ScrollView>
          {data.map((data, idx) => {
            return <AppointmentCard key={idx} data={data} />;
          })}
        </ScrollView>
      ) : (
        <View style={styles.emptyList}>
          <ActivityIndicator animating={true} color={Colors.main} size={40} />
          <Text>No Appointments data found</Text>
        </View>
      )}
    </>
  );
};

export default ListView;

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

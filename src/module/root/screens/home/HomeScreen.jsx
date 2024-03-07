import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import React, { useContext } from "react";
import CustomButton from "../../../../core/components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../../../../utils/AuthContext";
import AppointmentList from "../../components/AppointmentList";
// import {
//   TabsProvider,
//   Tabs,
//   TabScreen,
//   useTabIndex,
//   useTabNavigation,
// } from "react-native-paper-tabs";

const HomeScreen = ({}) => {
  const data = {
    doctorName: "Shubham Thorat",
    specialist: "Neurosurgeon",
    time: "6:00 PM",
    date: "26th Feb",
    status: "Confirmed",
  };

  const { setIsSignedIn } = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    // <TabsProvider defaultIndex={0}>
    //   <Tabs>
    //     <TabScreen label="Upcoming">
    //     <AppointmentList />
    //     </TabScreen>

    //     <TabScreen label="Past">
    //     <AppointmentList />
    //     </TabScreen>
    //   </Tabs>
    // </TabsProvider>

    <ScrollView style={styles.cointainer}>
      {/* <CustomButton title="navigatie to phone screen" handler={() => {
        AsyncStorage.removeItem("uid");
        setIsSignedIn(false);
      }}/> */}

      <AppointmentList />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cointainer: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
});

import { StyleSheet, Text, ScrollView, View, RefreshControl } from "react-native";
import React, { useContext, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../../theme/colors";
import AuthContext from "../../../utils/AuthContext";

const ListView = ({ data }) => {

  const [refreshing, setRefreshing] = useState(false);
  const {setReload} = useContext(AuthContext);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setReload((prv => prv + 1))
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <>
      {data.length ? (
        <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
          {data.map((data) => {
            return <AppointmentCard key={data.id} data={data} />;
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

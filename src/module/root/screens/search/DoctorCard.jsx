import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const DoctorCard = ({ data }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={ () => {navigation.navigate("DoctorDetailScreen", {data} )}}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={70}
            source={require("../../../../../assets/doc_avatar.png")}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{`${data.name} ${data.lastName}`}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Specialist:</Text>
            <Text style={styles.value}>{data.specialization}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Experience:</Text>
            <Text style={styles.value}>{data.experience}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    // marginBottom: 20,
    elevation: 3,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  avatarContainer: {
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginRight: 5,
  },
  value: {
    fontSize: 16,
    color: "#777",
  },
});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import ReviewView from "./ReviewView";
import AuthContext from "../../../../utils/AuthContext";
import database from "@react-native-firebase/database";
import { Portal } from "react-native-paper";
import Colors from "../../../../theme/colors";
import BookAppointmentModal from "./BookAppointmentModal";

const DoctorDetailScreen = () => {
  const [visible, setVisible] = React.useState(false);
  const { userData } = useContext(AuthContext);

  const bookAppontment = async (date, time) => {
    try {
      await database()
        .ref(`/users/general/${userData.uid}/appointments`)
        .push()
        .update({ date, time, status: "pending", doctorName:"test"});
      setVisible(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Portal>
        <BookAppointmentModal
          visible={visible}
          dismissHandler={() => setVisible(false)}
          onConfirm={bookAppontment}
        />
      </Portal>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={100}
          source={require("../../../../../assets/doc_avatar.png")}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>Shubham Thorat</Text>
        <Text style={styles.label}>Specialist:</Text>
        <Text style={styles.value}>Neurosurgeon</Text>
        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.bio}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          provident consectetur ad eaque, impedit eius blanditiis autem nemo,
          excepturi facilis incidunt odit exercitationem sint distinctio
          officiis optio. Ad, illum modi.
        </Text>
        <Text style={styles.label}>Rating:</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Ionicons name="star" size={20} color="#FFD700" />
          <Ionicons name="star" size={20} color="#FFD700" />
          <Ionicons name="star-half" size={20} color="#FFD700" />
          <Ionicons name="star-outline" size={20} color="#FFD700" />
          <Text style={styles.ratingText}>(3.5)</Text>
        </View>
        <Text style={styles.label}>Review:</Text>
        <View style={styles.reviewContainer}>
          <ReviewView
            rating={3.5}
            text="Great doctor, very knowledgeable and friendly."
          />
        </View>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  infoContainer: {},
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#777",
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: "#777",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#555",
  },
  reviewContainer: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    backgroundColor: "#EE4B2B",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

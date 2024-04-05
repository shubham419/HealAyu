import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext } from "react";
import { Avatar } from "react-native-paper";
import AuthContext from "../../../../utils/AuthContext";
import database from "@react-native-firebase/database";
import { Portal } from "react-native-paper";
import BookAppointmentModal from "./BookAppointmentModal";
import ReadOnlyRating from "./ReadOnlyRating";
import Toast from "react-native-root-toast";

const DoctorDetailScreen = ({ route }) => {
  const [visible, setVisible] = React.useState(false);
  const { userData, setReload } = useContext(AuthContext);
  const doctorData = route.params.data;
  console.log(doctorData);
  const bookAppontment = async (date, time) => {
    try {
      const appointmentID = database()
        .ref(`/users/general/${userData.uid}/appointments`)
        .push();

      const key = appointmentID.key;
      await appointmentID.set({
        date,
        time,
        status: "pending",
        doctorName: `${doctorData.name} ${doctorData.lastName}`,
        metadata: `/users/doctor/${doctorData.id}/appointments/${key}`,
      });

      // appointment that will be visible to doctor
      await database()
        .ref(`/users/doctor/${doctorData.id}/appointments/${key}`)
        .set({
          date,
          time,
          status: "pending",
          name: `${userData.name} ${userData.lastName}`,
          metadata: `/users/general/${userData.uid}/appointments/${key}`,
        });
        setReload((prv) => prv + 1)
        Toast.show("appointment booked", {duration: Toast.durations.LONG})
    } catch (e) {
      console.log(e);
    } finally {
      setVisible(false);
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
        <Text
          style={styles.value}
        >{`${doctorData.name} ${doctorData.lastName}`}</Text>
        <Text style={styles.label}>Specialist:</Text>
        <Text style={styles.value}>{doctorData.specialization}</Text>
        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.bio}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          provident consectetur ad eaque, impedit eius blanditiis autem nemo,
          excepturi facilis incidunt odit exercitationem sint distinctio
          officiis optio. Ad, illum modi.
        </Text>
        <Text style={styles.label}>Rating:</Text>
        <View>
          <ReadOnlyRating rating={doctorData.rating} />
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
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

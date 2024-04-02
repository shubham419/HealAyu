import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Colors from "../../../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import storage from "@react-native-firebase/storage";
import AuthContext from "../../../../utils/AuthContext";
import DocumentPicker from "react-native-document-picker";
import Toast from "react-native-root-toast";

const AppointmentDetailScreen = () => {
  const doc = DocumentPicker;
  const [fileResponse, setFileResponse] = useState(null);

  const handleDocumentSelection = async () => {
    try {
      const response = await doc.pickSingle({
        presentationStyle: "fullScreen",
        allowMultiSelection: false,
        copyTo: "documentDirectory",
      });
      if (response.size > 6551101) {
        Toast.show("Choose a file size of under 5 MB.", {
          duration: Toast.durations.LONG,
        });
        throw "file size more than 5 mb";
      }
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  };

  const { userData } = useContext(AuthContext);
  console.log(userData);

  useEffect(() => {
    const upload = async () => {
      try {
        console.log("called");
        let location = "location";
        if (userData.isDoctor) {
          location = `/users/doctor/${userData.uid}/appointment/ID/prescription`;
        } else location = `/users/general/${userData.uid}/appointment/ID/report`;
        await storage().ref(`${location}`).putFile(fileResponse.fileCopyUri);
        console.log(location);
      } catch (error) {
        console.log("error ==>", error);
      }
    };

    if (fileResponse) {
      console.log("hii");
      upload();
    }
  }, [fileResponse]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>Fri, Feb 23, 2024</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>4:55 PM</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.value, styles.completed]}>Completed</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Doctor</Text>
          <Text style={styles.value}>Shubham Thorat</Text>
        </View>
      </View>
      <View style={styles.actionButton}>
        <TouchableOpacity
          style={styles.actionButtonContent}
          activeOpacity={0.8}
          onPress={handleDocumentSelection}
        >
          <View style={styles.buttonContent}>
            <Ionicons
              name="cloud-upload-outline"
              size={24}
              color={Colors.white}
            />
            <Text style={styles.actionButtonText}>Upload Reports</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.actionButton}>
        <TouchableOpacity
          style={styles.actionButtonContent}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            <Ionicons
              name="cloud-download-outline"
              size={24}
              color={Colors.white}
            />
            <Text style={styles.actionButtonText}>Download Prescription</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AppointmentDetailScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight + 20,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  value: {
    fontSize: 16,
    color: Colors.gray,
  },
  completed: {
    color: Colors.success,
  },
  actionButton: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 5,
    backgroundColor: Colors.primary,
  },
  actionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
    marginLeft: 10,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});

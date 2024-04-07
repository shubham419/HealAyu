import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Colors from "../../../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import AuthContext from "../../../../utils/AuthContext";
import DocumentPicker from "react-native-document-picker";
import Toast from "react-native-root-toast";

import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { ActivityIndicator } from "react-native-paper";
import CustomButton from "../../../../core/components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const AppointmentDetailScreen = ({ route }) => {
  const data = route.params.data;
  console.log(data);
  const doc = DocumentPicker;
  const [fileResponse, setFileResponse] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  const handleDocumentSelection = async () => {
    try {
      const response = await doc.pickSingle({
        presentationStyle: "formSheet",
        type: [DocumentPicker.types.images],
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

  const { userData, setReload } = useContext(AuthContext);
  console.log("AppointmentDetailScreen ~ userData:-", userData);

  useEffect(() => {
    const upload = async () => {
      try {
        setLoader(true);
        let location = "location";
        if (userData.isDoctor) {
          location = `/users/doctor/${userData.name}::${userData.uid}/appointment/${data.id}/file`;
        } else {
          location = `/users/general/${userData.name}::${userData.uid}/appointment/${data.id}/file`;
        }
        await database()
          .ref(`${data.metadata}`)
          .update({ fileLocation: location });

        await storage().ref(`${location}`).putFile(fileResponse.fileCopyUri);
        Toast.show("document uploaded successfully", {
          duration: Toast.durations.SHORT,
        });
      } catch (error) {
        console.log("error ==>", error);
      } finally {
        setLoader(false);
      }
    };

    if (fileResponse) {
      upload();
    }
  }, [fileResponse]);

  const downloadDocument = async () => {
    try {
      setLoader(true);
      if (!data.fileLocation) {
        Toast.show("no file existed to download, please contact healayu team", {
          duration: Toast.durations.LONG,
        });
        return;
      }
      const downloadUrl = await storage()
        .ref(data.fileLocation)
        .getDownloadURL();

      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Toast.show("Permission denied", { duration: Toast.durations.LONG });
          console.log("Permission denied");
          return;
        }
      }

      const fileUri = FileSystem.documentDirectory + "example_file.png";
      const { uri } = await FileSystem.downloadAsync(downloadUrl, fileUri);

      const asset = await MediaLibrary.createAssetAsync(uri);

      await MediaLibrary.createAlbumAsync("Download", asset, false);
      Toast.show("File downloaded, Please check in gallery", {
        duration: Toast.durations.LONG,
      });
    } catch (error) {
      Toast.show("Error downloading file, please contact team", {
        duration: Toast.durations.LONG,
      });
      console.error("Error downloading file:", error);
    } finally {
      setLoader(false);
    }
  };

  const cahngeStatus = async () => {
    try {
      setLoader(true);
      await database().ref(data.metadata).update({ status: "confirmed" });
      await database()
        .ref(`/users/doctor/${userData.uid}/appointments/${data.id}`)
        .update({ status: "confirmed" });
      Toast.show("appointment confirmed successfully", {
        duration: Toast.durations.SHORT,
      });
      setReload(prv => prv + 1);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.main} />
          <Text>Please Wait...</Text>
        </View>
      ) : null}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{data.date}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{data.time}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Status</Text>
            <Text style={[styles.value, styles.completed]}>{data.status}</Text>
          </View>
          {data.doctorName ? (
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Doctor</Text>
              <Text style={styles.value}>{data.doctorName}</Text>
            </View>
          ) : null}
          {data.name ? (
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{data.name}</Text>
            </View>
          ) : null}
        </View>
        {userData.isDoctor && data.status == "pending" ? (
          <>
            <CustomButton
              title="Confirm Appointment"
              handler={cahngeStatus}
            ></CustomButton>
          </>
        ) : null}
        {data.status !== "pending" ? (
          <>
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
                onPress={downloadDocument}
              >
                <View style={styles.buttonContent}>
                  <Ionicons
                    name="cloud-download-outline"
                    size={24}
                    color={Colors.white}
                  />
                  <Text style={styles.actionButtonText}>
                    Download Prescription
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text>
              *appointment has been confirmed. please check email for further
              information
            </Text>
          </>
        ) : null}
      </ScrollView>
    </>
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
  loaderContainer: {
    position: "absolute",
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(207, 190, 199, 0.75)",
  },
});

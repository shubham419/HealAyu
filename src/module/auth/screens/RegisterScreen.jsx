import React, { useState, useCallback, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import DocumentPicker from "react-native-document-picker";
import Toast from "react-native-root-toast";
import database from "@react-native-firebase/database";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import storage from "@react-native-firebase/storage";
import AuthHeader from "../components/AuthHeader";
import Colors from "../../../theme/colors";
import CustomButton from "../../../core/components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../../../utils/AuthContext";
import { storeUser } from "../../../utils/asyncStorage";
import { TextInput } from "react-native-paper";

const RegisterScreen = ({ route }) => {
  const [userData, setUserData] = useState({
    name: null,
    lastName: null,
    email: null,
    isDoctor: false,
    experience: null,
    specialization: null,
  });
  const [fileResponse, setFileResponse] = useState(null);
  const [loader, setLoader] = useState(false);
  const { setIsSignedIn } = useContext(AuthContext);
  const doc = DocumentPicker;

  const handleInputChange = (field, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const toggleCreateDoctorAccount = () => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      isDoctor: !prevUserData.isDoctor,
    }));
  };

  const handleProceed = () => {
    const { name, lastName, email, experience, specialization } = userData;
    if (name && lastName && email) {
      if (userData.isDoctor && (!experience || !specialization || !fileResponse)) {
        Toast.show("Please fill in all the details to proceed", {
          duration: Toast.durations.SHORT,
        });
      } else {
        registerUser(userData);
      }
    } else {
      Toast.show("Please fill in all the details to proceed", {
        duration: Toast.durations.SHORT,
      });
    }
  };

  const handleDocumentSelection = async () => {
    try {
      const response = await doc.pickSingle({
        presentationStyle: "fullScreen",
        allowMultiSelection: false,
        copyTo: "documentDirectory",
      });
      console.log(response);
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

  const registerUser = async (data) => {
    try {
      const { uid, phone } = route.params;
      setLoader(true);
      if (data.isDoctor) {
        database()
          .ref(`/users/doctor/${uid}/info`)
          .set({ ...data, phone, rating: 4 });
        await storage()
          .ref(`/users/doctor/${data.name}::${uid}/certificate`)
          .putFile(fileResponse.fileCopyUri);
      } else {
        await database()
          .ref(`/users/general/${uid}/info`)
          .set({ ...data, phone });
      }
      await storeUser({ uid, ...data, phone });
      setIsSignedIn(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <AuthHeader>
        <MaterialCommunityIcons
          name="card-account-details"
          size={38}
          color={Colors.white}
        />
      </AuthHeader>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.heading}>Setup your profile</Text>
            <Text style={styles.subHeading}>We kept it quick and simple</Text>
            <TextInput
              style={styles.input}
              placeholder="enter your email"
              label="Email"
              value={userData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={userData.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={userData.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
            />
            <TouchableOpacity onPress={toggleCreateDoctorAccount}>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  isChecked={userData.isDoctor}
                  onClick={toggleCreateDoctorAccount}
                />
                <Text style={styles.checkboxLabel}>I am Doctor</Text>
              </View>
            </TouchableOpacity>
            {userData.isDoctor && (
              <>
                <TouchableOpacity onPress={handleDocumentSelection}>
                  <Entypo name="upload" size={24} color="black" />
                  <Text>Please upload your degree certificate</Text>
                </TouchableOpacity>
                <Text numberOfLines={1} ellipsizeMode="middle">
                  {fileResponse?.uri}
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="eg. (3 years)"
                  label="Experience"
                  value={userData.experience}
                  onChangeText={(text) => handleInputChange("experience", text)}
                  keyboardType="numeric"
                />

                <TextInput
                  style={styles.input}
                  placeholder="what is your specialization"
                  label="Specialization"
                  value={userData.specialization}
                  onChangeText={(text) => handleInputChange("specialization", text)}
                />
              </>
            )}
          </View>
          <CustomButton title="Proceed" handler={handleProceed} />
        </View>
      </ScrollView>
      {loader && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.main} />
          <Text>Please Wait...</Text>
        </View>
      )}
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  input: {
    // width: "100%",
    // height: 50,
    // borderWidth: 1,
    borderColor: Colors.gray,
    // borderRadius: 8,
    // paddingHorizontal: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
    marginTop: 25,
  },
  subHeading: {
    fontSize: 13,
    color: Colors.subHeading,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
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

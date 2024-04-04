import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useContext } from "react";
// import firestore from "@react-native-firebase/firestore";
import AuthHeader from "../components/AuthHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { OtpInput } from "react-native-otp-entry";
import Colors from "../../../theme/colors";
import CustomButton from "../../../core/components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import database from "@react-native-firebase/database";
import AuthContext from "../../../utils/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeUser } from "../../../utils/asyncStorage";

const OtpScreen = ({ route }) => {
  const confirmation = route.params.confirmation;
  const navigation = useNavigation();
  const [laoder, setLoader] = useState(false);
  const { setIsSignedIn } = useContext(AuthContext);

  const confirmCode = async (code) => {
    try {
      setLoader(true);
      const userCredential = await confirmation.confirm(code);
      const user = userCredential.user;

      const existedGeneralUser = await database()
        .ref(`/users/general/${user.uid}/info`)
        .once("value");

      const existedDoctorUser = await database()
        .ref(`/users/doctor/${user.uid}/info`)
        .once("value");
      console.log(existedDoctorUser,"existedGeneralUser ==>" ,existedGeneralUser);

      if (existedDoctorUser.exists()) {
        console.log(existedDoctorUser.val().email);
        await storeUser({
          uid: user.uid,
          isDoctor: true,
          email: existedDoctorUser.val().email,
          name: existedDoctorUser.val().name,
          lastName: existedDoctorUser.val().lastName,
          phone: existedDoctorUser.val().phone,
        });
        setIsSignedIn(true);
      } else if (existedGeneralUser.exists()) {
        await storeUser({
          uid: user.uid,
          isDoctor: false,
          email: existedGeneralUser.val().email,
          name: existedGeneralUser.val().name,
          lastName: existedGeneralUser.val().lastName,
          phone: existedGeneralUser.val().phone,
        });
        setIsSignedIn(true);
      } else {
        navigation.pop();
        navigation.navigate("RegisterScreen", { uid: user.uid, phone: route.params.phoneNumber });
      }
    } catch (e) {
      Toast.show("code is invalid", {
        duration: Toast.durations.LONG,
      });
      console.error(e);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <AuthHeader>
        <MaterialIcons name="verified-user" size={38} color={Colors.white} />
      </AuthHeader>
      <View style={styles.container}>
        <View style={styles.otpContainer}>
          <Text style={styles.heading}>Enter the One Time Password </Text>
          <Text style={styles.subHeading}>
            {`We have sent an OTP to ${route.params.phoneNumber}`}
          </Text>

          <OtpInput
            numberOfDigits={6}
            focusColor={Colors.main}
            focusStickBlinkingDuration={500}
            onFilled={(code) => confirmCode(code)}
            autoComplete
          />
        </View>
        {laoder ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.main} />
            <Text>Please Wait...</Text>
          </View>
        ) : null}
        <CustomButton title="Proceed" handler={() => {}} />
      </View>
    </>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    // alignItems: "center",
    justifyContent: "space-between",
  },

  otpContainer: {
    marginHorizontal: 15,
  },

  heading: {
    textAlign: "left",
    width: "100%",
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

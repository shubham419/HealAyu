import React, { useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
} from "react-native";
import AuthHeader from "../components/AuthHeader";
import PhoneInput from "react-native-phone-number-input";
import Toast from "react-native-root-toast";
import CustomButton from "../../../core/components/CustomButton";
import Colors from "../../../theme/colors";
import { FontAwesome5 } from '@expo/vector-icons';

const PhoneNumberScreen = () => {
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);
  const phoneInput = useRef(null);

  const validateNumber = useCallback(() => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    setValid(checkValid);
    if (!checkValid) {
      Toast.show("Please enter correct phone number", {
        duration: Toast.durations.LONG,
      });
    }
  }, [value]);

  return (
    <>
      <AuthHeader>
      <FontAwesome5 name="phone-alt" size={28} color={Colors.white} />      
      </AuthHeader>
      <View style={styles.container}>
        <View>

            <Text style={styles.heading}>Let’s get Started</Text>
            <Text style={styles.subHeading}>
              Verify your account using One Time Password
            </Text>


          <PhoneInput
            style={{width:"100%"}}
            ref={phoneInput}
            defaultValue={value}
            defaultCode="IN"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
        </View>
        <CustomButton title="Proceed" handler={validateNumber} />
      </View>
    </>
  );
};

export default PhoneNumberScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: StatusBar.currentHeight || 0,
  },

  heading: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  subHeading: {
    fontSize: 13,
    color: Colors.subHeading,
    marginBottom: 20,
  },
});

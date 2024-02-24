import { StyleSheet, Text, View,   StatusBar} from "react-native";
import React from "react";
import Colors from "../../../theme/colors";
import { AntDesign } from "@expo/vector-icons";

const AuthHeader = ({children}) => {
  return (
    <View style={styles.container}>
     {children}
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: Colors.main,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});

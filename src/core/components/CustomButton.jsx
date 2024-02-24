import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import Colors from "../../theme/colors";

const CustomButton = ({ handler, title }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handler}
      style={styles.appButtonContainer}
    >
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
      appButtonContainer: {
        elevation: 8,
        backgroundColor: Colors.main,
        borderRadius: 4,
        padding:8,
        margin:20,
        width:"90%"
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
      }
});

import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Colors from "../../../../theme/colors";

const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.description}>
          Welcome to our platform connecting patients and doctors! We are
          dedicated to providing a seamless and efficient way for patients to
          connect with healthcare professionals, receive medical advice, and
          schedule appointments from the comfort of their own homes.
        </Text>
        <Text style={styles.description}>
          Our mission is to bridge the gap between patients and doctors, making
          healthcare more accessible and convenient for everyone. Whether you're
          seeking medical advice, scheduling appointments, or managing your
          health records, our platform is designed to meet your needs. At our
          core, we prioritize the well-being and satisfaction of our users.
        </Text>
        <Text style={styles.description}>
          We strive to maintain the highest standards of quality, reliability,
          and security in all aspects of our platform. Our team is committed to
          continuously improving and innovating to ensure that you have the best
          possible experience. Thank you for choosing our platform to take care
          of your health needs. We're here to support you every step of the way
          on your journey to better health and well-being. For any inquiries or
          feedback, please don't hesitate to contact us at
          thoratshubham161@gmail.com. Your input is invaluable to us as we work
          to enhance our platform and serve you better.
        </Text>
        <Text style={styles.description}>- The HealAyu Team</Text>
      </View>
    </ScrollView>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.primary,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: Colors.black,
  },
});

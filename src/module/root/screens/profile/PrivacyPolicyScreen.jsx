import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>
        At HealAyu, we value your privacy and are committed to protecting your
        personal information. This Privacy Policy outlines how we collect, use,
        and safeguard your data when you use our services.
      </Text>

      <Text style={styles.subHeading}>1. Information We Collect</Text>
      <Text style={styles.text}>
        - When you use our platform, we may collect certain information from
        you, including: - Personal information such as your name, email address,
        and phone number. - Usage data, such as your interactions with the
        platform, preferences, and device information. - Health-related
        information that you choose to share with healthcare professionals.
      </Text>

      <Text style={styles.subHeading}>2. Data Security</Text>
      <Text style={styles.text}>
        - We implement appropriate technical and organizational measures to
        protect your personal information from unauthorized access, disclosure,
        alteration, or destruction. - However, please note that no method of
        transmission over the internet or electronic storage is 100% secure, and
        we cannot guarantee absolute security.
      </Text>

      <Text style={styles.subHeading}>3. Sharing Your Information</Text>
      <Text style={styles.text}>
        - We may share your information with third-party service providers,
        business partners, or healthcare professionals as necessary to provide
        our services. - We do not sell or rent your personal information to
        third parties for marketing purposes.
      </Text>

      <Text style={styles.subHeading}>4. Changes to This Privacy Policy</Text>
      <Text style={styles.text}>
        - We may update this Privacy Policy from time to time to reflect changes
        in our practices or legal requirements. We encourage you to review this
        page periodically for the latest information.
      </Text>
      <Text style={styles.text}>
        Thank you for trusting HealAyu with your personal information. We are
        committed to protecting your privacy and providing you with a secure and
        transparent experience.
      </Text>
      <Text style={styles.text}>
        For any questions or concerns about this Privacy Policy, please contact
        us at thoratshubham161@gmail.com.
      </Text>
      <Text style={styles.text}>- The HealAyu Team</Text>
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

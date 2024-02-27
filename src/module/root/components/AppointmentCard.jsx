import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';

const AppointmentCard = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MaterialIcons name="person" size={18} color="#555" />
        <Text style={styles.label}>Doctor:</Text>
        <Text style={styles.value}>{data.doctorName}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="local-hospital" size={18} color="#555" />
        <Text style={styles.label}>Specialist:</Text>
        <Text style={styles.value}>{data.specialist}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="event" size={18} color="#555" />
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{data.date}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="schedule" size={18} color="#555" />
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{data.time}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="assignment-turned-in" size={18} color="#555" />
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.value, { color: 'green' }]}>{data.status}</Text>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    marginLeft: 5,
    color: '#777',
  },
});

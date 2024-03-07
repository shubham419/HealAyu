import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { Button, IconButton, TouchableRipple } from "react-native-paper";
import Colors from "../../../../theme/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../../../../core/components/CustomButton";

const BookAppointmentModal = ({ visible, dismissHandler, onConfirm }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={dismissHandler}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <IconButton
              icon="close"
              size={24}
              color={Colors.black}
              onPress={dismissHandler}
            />
          </View>
          <TouchableRipple
            style={styles.dateBtn}
            onPress={showDatePicker}
            rippleColor="rgba(0, 0, 0, 0.2)"
          >
            <View style={styles.dateBtnContent}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={24}
                color={Colors.black}
              />
              <Text style={styles.dateBtnText}>Select Date and Time</Text>
            </View>
          </TouchableRipple>

          <View style={styles.dateTimeContainer}>
            <Text style={styles.label}>Selected Date:</Text>
            <Text style={styles.value}>
              {selectedDate ? selectedDate.toDateString() : "-------"}
            </Text>
            <Text style={styles.label}>Selected Time:</Text>
            <Text style={styles.value}>
              {selectedDate ? selectedDate.toLocaleTimeString() : "-------"}
            </Text>
          </View>

          <View style={styles.confirmbtn}>
            <Button
              icon="check"
              mode="outlined"
              onPress={() => {
                if (selectedDate)
                  onConfirm(
                    selectedDate.toDateString(),
                    selectedDate.toLocaleTimeString()
                  );
              }}
            >
              confirm
            </Button>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </View>
    </Modal>
  );
};

export default BookAppointmentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: Colors.white,
    margin: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  dateBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 8,
    backgroundColor: Colors.main,
  },
  dateBtnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dateBtnText: {
    color: Colors.black,
    fontSize: 16,
    marginLeft: 10,
  },
  dateTimeContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 10,
  },
  confirmbtn: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

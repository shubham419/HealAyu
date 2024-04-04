import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ReadOnlyRating = ({ rating }) => {
  // Handle invalid or out-of-range rating values
  if (!rating) rating = 0;
  const clampedRating = Math.min(Math.max(rating, 0), 5);

  const filledStars = new Array(clampedRating).fill("full");
  const emptyStars = new Array(5 - clampedRating).fill("empty");

  return (
    <View style={styles.ratingContainer}>
      <View style={styles.starRow}>
        {filledStars.map((star, index) => (
          <MaterialCommunityIcons
            key={index}
            name={star === "full" ? "star" : "star-outline"}
            size={30}
            color="gold"
            style={styles.star}
          />
        ))}
        {emptyStars.map((star, index) => (
          <MaterialCommunityIcons
            key={index + clampedRating}
            name="star-outline"
            size={30}
            color="gray"
            style={styles.star}
          />
        ))}
      </View>
      <Text style={styles.ratingText}>Rating: {clampedRating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "column",
    alignItems: "center", // Center stars horizontally
  },
  starRow: {
    flexDirection: "row",
  },
  star: {
    marginRight: 5,
  },
  ratingText: {
    marginTop: 5, // Adjust spacing between stars and text
  },
});

export default ReadOnlyRating;

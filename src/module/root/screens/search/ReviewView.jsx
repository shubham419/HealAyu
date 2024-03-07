import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReviewView = ({ rating, text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        {Array.from({ length: 5 }, (_, i) => (
          <Ionicons
            key={i}
            name={i < Math.floor(rating) ? 'star' : i < rating ? 'star-half' : 'star-outline'}
            size={20}
            color="#FFD700"
          />
        ))}
        <Text style={styles.ratingText}>({rating})</Text>
      </View>
      <Text style={styles.reviewText}>{text}</Text>
    </View>
  );
};

export default ReviewView;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#555',
  },
  reviewText: {
    fontSize: 16,
    color: '#555',
  },
});

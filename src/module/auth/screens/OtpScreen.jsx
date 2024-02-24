import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import firestore from "@react-native-firebase/firestore";
import AuthHeader from '../components/AuthHeader';
import { MaterialIcons } from '@expo/vector-icons';


const OtpScreen = () => {
  return (
  <>
    <AuthHeader>
    <MaterialIcons name="verified-user" size={28} color="black" />
    </AuthHeader>
  </>
  )
}

export default OtpScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../../core/components/CustomButton'
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({}) => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>HomeScreen</Text>
      <CustomButton title="navigatie to phone screen" handler={() => {navigation.navigate('AuthNavigation')}}/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
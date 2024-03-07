import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import DoctorCard from './DoctorCard'
import DoctorList from './DoctorList'

const SearchScreen = () => {
    const data = {
        name: "Shubham Thorat",
        specialist: "Neurosurgeon",
        experience: "3 yers",
    }
  return (
    <View style={styles.container}>
      <DoctorCard data={data} />

      <DoctorList />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    container:{
        marginTop: StatusBar.currentHeight
    }
})
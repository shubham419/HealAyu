import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native'
import React, {useContext} from 'react'
import CustomButton from '../../../core/components/CustomButton'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../../utils/AuthContext';
import AppointmentCard from '../components/AppointmentCard';
import AppointmentList from '../components/AppointmentList';


const HomeScreen = ({}) => {

  const data  = {
    doctorName: "Shubham Thorat",
    specialist: "Neurosurgeon",
    time: "6:00 PM",
    date: "26th Feb",
    status: "Confirmed"
  }

    const {setIsSignedIn} = useContext(AuthContext);
    const navigation = useNavigation();
  return (
    <ScrollView style={styles.cointainer}>
      <Text>HomeScreen</Text>
      <CustomButton title="navigatie to phone screen" handler={() => {
        AsyncStorage.removeItem("uid");
        setIsSignedIn(false);
      }}/>
      <AppointmentCard data={data}/>
      <AppointmentCard data={data}/>
      <AppointmentCard data={data}/>

      <AppointmentList />
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({ 
  cointainer:{
    marginTop: StatusBar.currentHeight,
    flex:1
  }

})
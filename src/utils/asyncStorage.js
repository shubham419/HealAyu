import AsyncStorage from "@react-native-async-storage/async-storage";

// storing data
const storeUser = async (userData) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {
    console.log(error);
  }
};

// getting data
const getUser = async () => {
  try {
    const userData = JSON.parse(await AsyncStorage.getItem("user"));
    return userData;
  } catch (error) {
    console.log(error);
  }
};

export { getUser, storeUser };

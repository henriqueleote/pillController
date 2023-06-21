import AsyncStorage from '@react-native-async-storage/async-storage';

export const retrieveData = async (key) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.log('Error retrieving data:', error);
    return null;
  }
};

export const storeData = async (key, data) => {
  try {
    const dataToStore = JSON.stringify(data);
    await AsyncStorage.setItem(key, dataToStore);
  } catch (error) {
    console.log('Error storing data:', error);
  }
};

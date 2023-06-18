import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { retrieveData } from '../storageUtils';

import UserPicker from '../components/UserPicker';

const Home = () => {

  const windowHeight = Dimensions.get('screen').height;


  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      const storedData = await retrieveData('@storage_data');
      if (storedData) {
        console.log(storedData);
        setData(storedData);
      }
    };
    loadData();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleAddPillData = () => {
    if (selectedUser) {
      navigation.navigate('AddPillData', { user: selectedUser });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer} key={item.pillID}>
      <Text>{item.pillName}</Text>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: windowHeight - 250,
    },
    pickerContainer: {
      marginTop: 20,
      flex: 1,
    },
    listContainer: {
      height: windowHeight - 400,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 100,
      right: 30,
    },
    button: {
      backgroundColor: 'white',
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
    },
    buttonText: {
      fontSize: 30,
      color: 'black'
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <UserPicker onUserSelect={handleUserSelect} />
        <Text>Selected User: {selectedUser ? selectedUser.username : 'None'}</Text>
      </View>
      <ScrollView style={styles.itemsContainer}>
        {data.map((pill) => {
          if (selectedUser && selectedUser.id === pill.userID) {
            return renderItem({ item: pill });
          }
          return null; // Render nothing if the condition is not met
        })}

      </ScrollView>
      <View style={styles.buttonContainer}>
        <GestureHandlerRootView>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}
            onPress={handleAddPillData}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

export default Home;

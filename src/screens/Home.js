import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { retrieveData } from '../storageUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const windowHeight = Dimensions.get('screen').height;
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);


  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      const retrievedData = await retrieveData('@storage_users');
      if (retrievedData.length > 0) {
        setUsers(retrievedData);
      }else{
        console.log("no users");
      }
    };
    fetchUsers();
  }, [users]);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await retrieveData('@storage_data');
      if (storedData) {
        setData(storedData);
        console.log(storedData);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await retrieveData('@storage_data');
      if (storedData) {
        setData(storedData);
        console.log(storedData);
      }
    };
    fetchData();
    const selectedUser = users.find((user) => user.id === selectedUserId);
    const username = selectedUser ? selectedUser.username : 'None';
    console.log(username);
  }, [selectedUserId]);

  const handleUserSelect = (value) => {
    setSelectedUserId(value);
  };

  const handleAddPillData = () => {
    if (selectedUserId) {
      const selectedUser = users.find((user) => user.id === selectedUserId);
      navigation.navigate('AddPillData', { user: selectedUser });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardContainer} key={item.pillID}>
        <Text style={styles.cardTitle}>{item.pillName}</Text>
        <View style={styles.cardInfoContainer}>
          <Text style={styles.cardInfo}>Per Box: {item.perBox}</Text>
          <Text style={styles.cardInfo}>Per Day: {item.perDay}</Text>
          <Text style={styles.cardInfo}>Starting Date: {item.startingDate}</Text>
        </View>
      </View>
    );
  };
  
  

  const styles = StyleSheet.create({
    itemsContainer:{
      paddingLeft: 15,
      paddingRight: 15,
    },
    container: {
      flex: 1,
      height: windowHeight - 250,
    },
    pickerContainer: {
      marginTop: 20,
      width: 300,
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
      color: 'black',
    },
    cardContainer: {
      backgroundColor: '#FFF',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    cardInfoContainer: {
      marginTop: 8,
    },
    cardInfo: {
      fontSize: 14,
      marginBottom: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedUserId}
          onValueChange={handleUserSelect}
          style={styles.pickerContainer}
        >
          {users.map((user) => (
            <Picker.Item key={user.id} label={user.username} value={user.id} />
          ))}
        </Picker>
      </View>
      <ScrollView style={styles.itemsContainer}>
        {data.map((pill) => {
          if (selectedUserId && selectedUserId === pill.userID) {
            return renderItem({ item: pill });
          }
          return null; // Render nothing if the condition is not met
        })}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <GestureHandlerRootView>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleAddPillData}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </GestureHandlerRootView>
      </View>        
    </View>
  );
};

export default Home;

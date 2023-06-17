import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { SwipeListView } from 'react-native-swipe-list-view';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';


const Settings = () => {

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [isComponentMounting, setComponentMounting] = useState(true);

  const retrieveData = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('@storage_Key');
      setUsers(JSON.parse(storedUsers));
      console.log(jsonValue);
    } catch (e) {
      console.log("error loading -> " + e);
    }
  };

  const storeData = async () => {
    try {
      const usersToStore = JSON.stringify(users);
      await AsyncStorage.setItem('@storage_Key', usersToStore).then(console.log("saved with success"));
    } catch (e) {
      console.log("error saving -> " + e);
    }
  };

  const removeUser = (userId) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setUsers(prevUsers => prevUsers.filter(user => user.id !== userId)),
        },
      ],
      { cancelable: false }
    );
    //
  };

  const editUser = (userId) => {
    // Implement edit logic here
  };

  const addUser = () => {
    if (userName.trim() === '') {
      return;
    }

    const userID = uuid.v4();

    const newUser = {
      id: userID,
      username: userName,
    };

    setUsers(prevUsers => [...(prevUsers || []), newUser]);

    storeData();

    setUserName('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer} key={item.id}>
      <Text>{item.username}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item.id)}
        >
        <Image source={require('../../assets/icons/edit.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeUser(item.id)}
        >
        <Image source={require('../../assets/icons/delete.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
  

  useEffect(() => {
    if (isComponentMounting) {
      setComponentMounting(false);
      return;
    }
    storeData();
  }, [users]);

  useEffect(() => {
    retrieveData();
  }, []); //call when mounted

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    user: {
      marginBottom: 4,
    },
    list: {
      marginTop: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    editButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    deleteButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    input: {
      marginTop:50,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
    },
    inputButtonContainer: {
      marginTop: 10,
      marginHorizontal: 12,
    },    
    
    
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      {
        users.map((user) => (
          renderItem({ item: user }) // Pass the user as 'item' prop to renderItem
        ))
      }
      <View>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Pacient name"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputButtonContainer}>
        <Button title="Add User" onPress={addUser} />
      </View>
    </GestureHandlerRootView>
  );
};

export default Settings;

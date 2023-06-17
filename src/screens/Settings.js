import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Alert, ScrollView, Dimensions } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { retrieveData, storeData } from '../storageUtils';
import uuid from 'react-native-uuid';

const Settings = () => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [isComponentMounting, setComponentMounting] = useState(true);

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
  };

  const editUser = (userId) => {
    const user = users.find(user => user.id === userId);
    /*if (user) {
      Alert.prompt(
        'Edit User',
        'Enter the new username:',
        (newUsername) => {
          if (newUsername !== null && newUsername.trim() !== '') {
            editUser(userId, newUsername);
          }
        },
        'plain-text',
        user.username
      );
    }*/
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

    storeData('@storage_Key', users);

    setUserName('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer} key={item.id}>
      <Text>{item.username}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => editUser(item.id)}
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
    storeData('@storage_Key', users);
  }, [users]);

  useEffect(() => {
    const loadData = async () => {
      const storedUsers = await retrieveData('@storage_Key');
      if (storedUsers) {
        setUsers(storedUsers);
      }
    };
    loadData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    pickerTitle: {
      fontSize: 18,
      textAlign: 'center'
    },
    itemsContainer:{
      marginTop: 20,
      height: Dimensions.get('window').height - 320, // Adjust the value according to your needs
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
      marginTop: 50,
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
      <Text style={styles.pickerTitle}>Escolha o utilizador</Text>
      <ScrollView style={styles.itemsContainer}>
      {users.map((user) => (
        renderItem({ item: user })
      ))}
            </ScrollView>
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

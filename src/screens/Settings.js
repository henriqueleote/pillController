import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const Settings = () => {
  
  //AsyncStorage.clear();
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [isComponentMounting, setComponentMounting] = useState(true);

  const retrieveData = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('@storage_Key');
      setUsers(JSON.parse(storedUsers));
      console.log(jsonValue);
    } catch(e) {
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
    inputContainer: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    input: {
      flex: 1,
      marginRight: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
    },
    user: {
      marginBottom: 4,
    },
    list: {
      marginTop: 10,
    }
  });

  return (
    <View style={styles.container}>


      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Pacient name"
          keyboardType="numeric"
        />
        <Button title="Add User" onPress={addUser} />
      </View>

      <FlatList
  data={users}
  keyExtractor={item => item.id}
  renderItem={({ item }) => (
    // Render individual items
    <Text>{item.username}</Text>
  )}
  extraData={users} // Pass the users array as extraData to force re-render
/>

    </View>
  );
};

export default Settings;

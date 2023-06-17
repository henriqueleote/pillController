import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';

const Settings = () => {

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  const addUser = () => {
    if (newUser.trim() === '') {
      return;
    }

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setNewUser('');
  };

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
  });

  return (
    <View style={styles.container}>


      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newUser}
          onChangeText={setNewUser}
          placeholder="Pacient name"
          keyboardType="numeric"
        />
        <Button title="Add User" onPress={addUser} />
      </View>

      <FlatList
        data={users}
        renderItem={({ item }) => <Text style={styles.user}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
  );
};

export default Settings;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker"
import { retrieveData } from '../storageUtils';

const UserPicker = () => {

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const retrievedData = await retrieveData('@storage_Key');
      setUsers(retrievedData);
    };
    fetchData();
  }, []);

  const handlePickerChange = (value) => {
    setSelectedUserId(value);
    console.log(value)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pickerTitle}>Escolha o utilizador</Text>
      <Picker style={styles.pickerContainer} selectedValue={selectedUserId} onValueChange={handlePickerChange}>
        {users.map((user) => (
          <Picker.Item key={user.id} label={user.username} value={user.id} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  pickerContainer: {
    width: 300,
  },
  pickerTitle: {
    fontSize: 18
  },
});
  
export default UserPicker;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storeData, retrieveData } from '../storageUtils';
import uuid from 'react-native-uuid';


const AddPillData = ({ route }) => {
  const { user } = route.params;

  const [data, setData] = useState([]);
  const [pillName, setPillName] = useState('fds');
  const [perBox, setPerBox] = useState('fds');
  const [perDay, setPerDay] = useState('fds');
  const [startingDate, setStartingDate] = useState('fds');
  const [isComponentMounting, setComponentMounting] = useState(true);

  const navigation = useNavigation();

  const handleGoBack = () => {
    // Handle saving the pill data or any other logic before navigating back
    navigation.goBack();
  };

  const addPills = () => {
    if (pillName.trim() === '' || perBox.trim() === '' || perDay.trim() === '' || startingDate.trim() === '') {
        alert('Please fill in all fields');
        return;
      }

    const pillID = uuid.v4();

    const newData = {
      userID: user.id,
      pillID: pillID,
      pillName: pillName,
      perBox: perBox,
      perDay, perDay,
      startingDate, startingDate,
    };

    console.log(newData);
    setData(prevData => [...(prevData || []), newData]);

    setPillName('');
    setPerBox('');
    setPerDay('');
    setStartingDate('');
  };

  useEffect(() => {
    if (isComponentMounting) {
      setComponentMounting(false);
      return;
    }
    storeData('@storage_data', data);
  }, [data]);

  useEffect(() => {
    const loadUsers = async () => {
      const storedData = await retrieveData('@storage_data');
      if (storedData) {
        setData(storedData);
      }
    };
    loadUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Pill Data</Text>
      <Text style={styles.label}>User: {user ? user.username : ''}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Pill Name:</Text>
        <TextInput
          style={styles.input}
          value={pillName}
          onChangeText={setPillName}
          placeholder="Enter pill name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Pills Per Box:</Text>
        <TextInput
          style={styles.input}
          value={perBox}
          onChangeText={setPerBox}
          placeholder="Enter pills per box"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Pills Per Day:</Text>
        <TextInput
          style={styles.input}
          value={perDay}
          onChangeText={setPerDay}
          placeholder="Enter pills per day"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Starting Date:</Text>
        <TextInput
          style={styles.input}
          value={startingDate}
          onChangeText={setStartingDate}
          placeholder="Enter starting date"
          keyboardType="numeric"
        />
      </View>

      <Button title='Create pill' onPress={addPills}/>
      <Button title="Go Back" onPress={handleGoBack} style={{marginTop: 20}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
});

export default AddPillData;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storeData, retrieveData } from '../storageUtils';
import uuid from 'react-native-uuid';


const AddPillData = ({ route }) => {
  const { user, data: initialData } = route.params;

  const [data, setData] = useState(initialData || []);
  const [pillName, setPillName] = useState('');
  const [perBox, setPerBox] = useState('');
  const [perDay, setPerDay] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [hasNewData, setHasNewData] = useState(false);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('Home')
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
      perDay: perDay,
      startingDate: startingDate,
    };
  
    setData(prevData => [...prevData, newData]);
  
    setHasNewData(true);
  
    setPillName('');
    setPerBox('');
    setPerDay('');
    setStartingDate('');
  };
  

  
  useEffect(() => {
    if(hasNewData){
      storeData('@storage_data', data);
      navigation.navigate('Home')
    }
  }, [data]);

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

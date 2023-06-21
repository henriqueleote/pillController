import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storeData } from '../storageUtils';
import uuid from 'react-native-uuid';
import DatePicker from 'react-native-date-picker'


const AddPillData = ({ route }) => {
  const { user, data: initialData } = route.params;

  const [data, setData] = useState(initialData || []);
  const [pillName, setPillName] = useState('');
  const [perBox, setPerBox] = useState('');
  const [perDay, setPerDay] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [hasNewData, setHasNewData] = useState(false);

  const [date, setDate] = useState(new Date())
  const [modalOpen, setModalOpen] = useState(false)

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('Home')
  };

  //on date change, since there's not handleDateChange
  useEffect(() => {
    console.log(date);
    setStartingDate(date);
  },[date])

  const addPills = () => {
    if (pillName.trim() === '' || perBox.trim() === '' || perDay.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    console.log(startingDate);


    const pillsPerDay = parseInt(perDay, 10);
    const pillsInBox = parseInt(perBox, 10);

    const daysUntilOutOfStock = Math.ceil(pillsInBox / pillsPerDay);
    const outOfStockDate = new Date(startingDate.getTime() + (daysUntilOutOfStock - 1) * 24 * 60 * 60 * 1000);

    const pillID = uuid.v4();

    const newData = {
      userID: user.id,
      pillID: pillID,
      pillName: pillName,
      perBox: perBox,
      perDay: perDay,
      startingDate: startingDate.toISOString().split('T')[0],
      outOfStockDate: outOfStockDate.toISOString().split('T')[0], // Convert date to ISO format and extract the date part
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
        <Button title="Open" onPress={() => setModalOpen(true)} />
      <DatePicker
        modal
        mode="date"
        open={modalOpen}
        date={date}
        onConfirm={(date) => {
          setModalOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setModalOpen(false)
        }}
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

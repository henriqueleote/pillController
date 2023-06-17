import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from "@react-native-picker/picker"

const ComboBox = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [pillData, setPillData] = useState({
    name: '',
    totalStock: '',
    perDay: '',
  });

  const handleUserChange = (value) => {
    setSelectedUser(value);
  };

  const handleNewUserChange = (value) => {
    setNewUserName(value);
  };

  const handleCreateUser = () => {
    if (newUserName.trim() === '') {
      return;
    }

    const newUser = {
      id: Date.now(),
      name: newUserName,
      pillData: [],
    };

    setUsers([...users, newUser]);
    setNewUserName('');
  };

  const handlePillDataChange = (name, value) => {
    setPillData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPillData = () => {
    if (
      pillData.name.trim() === '' ||
      pillData.totalStock.trim() === '' ||
      pillData.perDay.trim() === ''
    ) {
      return;
    }

    const updatedUsers = users.map((user) => {
      if (user.id === parseInt(selectedUser)) {
        const newPillData = {
          name: pillData.name,
          totalStock: pillData.totalStock,
          perDay: pillData.perDay,
        };
        user.pillData.push(newPillData);
      }
      return user;
    });

    setUsers(updatedUsers);
    setPillData({
      name: '',
      totalStock: '',
      perDay: '',
    });
  };

  return (
    <View>
      <Picker
        selectedValue={selectedUser}
        onValueChange={handleUserChange}
      >
        <Picker.Item label="Select a user" value="" />
        {users.map((user) => (
          <Picker.Item key={user.id} label={user.name} value={user.id} />
        ))}
      </Picker>

      {selectedUser && (
        <View>
          <Text>User Information:</Text>
          <Text>Name: {users.find((user) => user.id === parseInt(selectedUser))?.name}</Text>
          <View>
            <Text>Pill Data:</Text>
            {users
              .find((user) => user.id === parseInt(selectedUser))
              ?.pillData.map((pill, index) => (
                <Text key={index}>
                  <Text>
                    <Text>Name: </Text>
                    {pill.name},{' '}
                    <Text>Total Stock: </Text>
                    {pill.totalStock},{' '}
                    <Text>Per Day: </Text>
                    {pill.perDay}
                  </Text>
                </Text>
              ))}
          </View>
          <View>
            <Text>Add Pill Data:</Text>
            <TextInput
              placeholder="Pill Name"
              value={pillData.name}
              onChangeText={(value) => handlePillDataChange('name', value)}
            />
            <TextInput
              placeholder="Total Stock"
              value={pillData.totalStock}
              onChangeText={(value) => handlePillDataChange('totalStock', value)}
            />
            <TextInput
              placeholder="Per Day"
              value={pillData.perDay}
              onChangeText={(value) => handlePillDataChange('perDay', value)}
            />
            <Button title="Add Pill Data" onPress={handleAddPillData} />
          </View>
        </View>
      )}
    </View>
  );
};

export default ComboBox;

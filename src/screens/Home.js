import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { retrieveData } from '../storageUtils';

const Home = () => {
  const windowHeight = Dimensions.get('screen').height;

  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const retrievedData = await retrieveData('@storage_users');
      setUsers(retrievedData);
      if (retrievedData.length > 0) {
        setSelectedUser(retrievedData[0].id);
      } else if (!retrievedData.some((user) => user.id === selectedUser)) {
        setSelectedUser(null);
      }
    };
    fetchData();
  }, [users]);


  const handleUserSelect = (value) => {
    setSelectedUser(value);
  };

  const styles = StyleSheet.create({
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
  });

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedUser}
          onValueChange={handleUserSelect}
          style={styles.pickerContainer}
        >
          {users.map((user) => (
            <Picker.Item key={user.id} label={user.username} value={user.id} />
          ))}
        </Picker>
        
      </View>

    </View>
  );
};

export default Home;

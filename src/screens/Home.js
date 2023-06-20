import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { retrieveData, storeData } from '../storageUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ route }) => {
  const windowHeight = Dimensions.get('screen').height;
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleted, setDeleted] = useState(false);
  
  const navigation = useNavigation();

  const fetchData = async () => {
    const storedData = await retrieveData('@storage_data');
    console.log("got data");
    if (storedData) {
      setData(storedData);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const retrievedData = await retrieveData('@storage_users');
      if (retrievedData.length > 0) {
        setUsers(retrievedData);
      } else {
        console.log("no users");
      }
    };
    fetchUsers();
  }, [users]);

  useEffect(() => {
    if(deleted){
      setDeleted(false);
      storeData('@storage_data', data);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const selectedUser = users.find((user) => user.id === selectedUserId);
    const username = selectedUser ? selectedUser.username : 'None';
  }, [selectedUserId]);

  //use this method to update the list setSelectedUserID(selectedUserId)
  const handleUserSelect = (value) => {
    setSelectedUserId(value);
  };

  const handleAddPillData = () => {
    if (selectedUserId) {
      const selectedUser = users.find((user) => user.id === selectedUserId);
      navigation.navigate('AddPillData', { user: selectedUser });
    }
  };

  
  const removePill = (pillID) => {
    Alert.alert(
      'Delete pill',
      'Are you sure you want to delete this pill?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDeleted(true);
            //TODO CHECK WHY TF HE'S DELETTING ALL OF THEM
            setData(prevData => prevData.filter(pill => pill.pillID !== pillID));
          }
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item, onItemLongPress }) => {
    const handleLongPress = () => {
      removePill(item.pillID);
    };
    return (
      <TouchableWithoutFeedback onLongPress={handleLongPress} key={item.pillID}>
      <View style={styles.cardContainer} >
        <Text style={styles.cardTitle}>{item.pillName}</Text>
        <View style={styles.cardInfoContainer}>
          <Text style={styles.cardInfo}>Per Box: {item.perBox}</Text>
          <Text style={styles.cardInfo}>Per Day: {item.perDay}</Text>
          <Text style={styles.cardInfo}>Starting Date: {item.startingDate}</Text>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  };



  const styles = StyleSheet.create({
    itemsContainer: {
      paddingLeft: 15,
      paddingRight: 15,
    },
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
    cardContainer: {
      backgroundColor: '#FFF',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    cardInfoContainer: {
      marginTop: 8,
    },
    cardInfo: {
      fontSize: 14,
      marginBottom: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedUserId}
          onValueChange={handleUserSelect}
          style={styles.pickerContainer}
        >
          {users.map((user) => (
            <Picker.Item key={user.id} label={user.username} value={user.id} />
          ))}
        </Picker>
      </View>
      <ScrollView style={styles.itemsContainer}>
        {data.map((pill) => {
          if (selectedUserId && selectedUserId === pill.userID) {
            return renderItem({ item: pill });
          }
          return null; // Skip rendering for non-matching pills
        })}
        {data.length === 0 || data.every((pill) => pill.userID !== selectedUserId) && (
          <Text>No pills</Text>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <GestureHandlerRootView>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleAddPillData}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

export default Home;

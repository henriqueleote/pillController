import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { retrieveData, storeData } from '../storageUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const windowHeight = Dimensions.get('screen').height;
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      console.log("Home page")
      fetchData();
      fetchUsers();
    }
  }, [isFocused]);

  useEffect(() => {
    if(!selectedUserId)
      if(users.length > 0)
        setSelectedUserId(users[0].id); 
  }, [users]);

  const fetchData = async () => {
    const retrievedData = await retrieveData('@storage_data');
    if (retrievedData) {
      setData(retrievedData);
      console.log(retrievedData)
    }
  };

  const fetchUsers = async () => {
    const retrievedUsers = await retrieveData('@storage_users');
    if (retrievedUsers) {
      setUsers(retrievedUsers);
      console.log(retrievedUsers)
    }
  };

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      storeData('@storage_data', data);
    }
  }, [data]);

  useEffect(() => {
    const selectedUser = users.find((user) => user.id === selectedUserId);
    console.log("i was called");
  }, [selectedUserId]);

  //use this method to update the list setSelectedUserID(selectedUserId)
  const handleUserSelect = (value) => {
    setSelectedUserId(value);
  };

  const handleAddPillData = () => {
    console.log(selectedUserId)
    if (selectedUserId) {
      const selectedUser = users.find((user) => user.id === selectedUserId);
      navigation.navigate('AddPillData', { user: selectedUser, data: data });
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
    hasDataContainer: {
      flex: 1,
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally
    },
    noDataContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally
    },
    addButtonText: {
      fontSize: 120,
      textAlign: 'center'
    },
    noPillContainer:{
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally
    }
  });

  if (!isFocused) {
    // Return a loading state or placeholder view while the component is not focused
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {users.length > 0 ? (
        <>
          <View style={styles.hasDataContainer}>
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
              {
              data.map((pill) => {
                if (selectedUserId && selectedUserId === pill.userID) {
                  return renderItem({ item: pill });
                }
                return null; // Skip rendering for non-matching pills
              })
              }
              {
              data.length === 0 ||
                data.every((pill) => pill.userID !== selectedUserId) ? (
                  <View style={styles.noPillContainer}>
                    <TouchableOpacity
                      style={styles.addButton}
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate('AddPillData');
                      }}
                    >
                      <Text style={styles.addButtonText}>+</Text>
                      <Text style={styles.addUserText}>Add a pill to start</Text>
                    </TouchableOpacity>
                </View>
              ) : null
              }
            </ScrollView>
            <View style={styles.buttonContainer}>
              <GestureHandlerRootView>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={handleAddPillData}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </GestureHandlerRootView>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.noDataContainer}>
          <View style={styles.addButtonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('Settings');
              }}
            >
              <Text style={styles.addButtonText}>+</Text>
              <Text style={styles.addUserText}>Add an user to start</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

};

export default Home;

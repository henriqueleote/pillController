import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

import UserPicker from '../components/UserPicker';

const Main = () => {
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <UserPicker />
      </View>
      <View style={styles.buttonContainer}>
        <GestureHandlerRootView>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("screen").height-250,
  },
  pickerContainer: {
    marginTop: 20,
    flex: 1,
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
    color: 'black'
  }
});

export default Main;

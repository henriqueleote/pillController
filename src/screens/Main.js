import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ComboBox from '../components/ComboBox';

const Main = () => {
  return (
    <View >
      <ComboBox />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;

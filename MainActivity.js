import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './navigation/tabs';
import Main from './src/screens/Main';
import Settings from './src/screens/Settings';



const Stack = createStackNavigator();

const MainActivity = () => {
    return (
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    );
}

export default MainActivity;
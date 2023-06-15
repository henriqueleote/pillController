import React from 'react';
import { StyleSheet, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Main from '../src/screens/Main';
import Settings from '../src/screens/Settings';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 70,
                }
            }}
        >
            <Tab.Screen name='Main' component={Main} options={{ headerShown: false, tabBarIcon: ({ focused }) => (<Image source={require('../assets/icons/home.png')} style={{ width: 30, height: 30, tintColor: focused ? '#2a324b' : '#2a324b' }} />) }} />
            <Tab.Screen name='Settings' component={Settings} options={{ headerShown: false, tabBarIcon: ({ focused }) => (<Image source={require('../assets/icons/home.png')} style={{ width: 30, height: 30, tintColor: focused ? '#2a324b' : '#2a324b' }} />) }} />
        </Tab.Navigator>
    )
}

export default Tabs;
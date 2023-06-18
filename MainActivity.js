import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './navigation/tabs';
import AddPillData from './src/screens/AddPillData';



const Stack = createStackNavigator();

const MainActivity = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                <Stack.Screen name="AddPillData" component={AddPillData} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
        /*<NavigationContainer>
            <Tabs />
            <Stack.Screen name="AddPillData" component={AddPillData} options={{ tabBarButton: () => null, tabBarVisible: false }}/>
        </NavigationContainer>*/
    );
}

export default MainActivity;
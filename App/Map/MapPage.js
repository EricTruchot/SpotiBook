import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Map from '../../Container/Map.js';
// import { GoogleMap } from '../../Container/Map.js';

export default function MapPage() {
return (
    <Map />
    // 'test'
    // <>
    //     <Text>blabla</Text><GoogleMap></GoogleMap></>
);
};



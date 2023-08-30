import React, { useState, useEffect } from 'react';
import AccueilUnregistered from "./src/app/accueil/AccueilUnregistered";
import Map from "./src/app/map/MapPage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccueilRegistered from "./src/app/accueil/AccueilRegistered";
import { retrieveData } from './src/app/services/localStorageUsers';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator>
                
                { retrieveData('isLoggedIn') ? (
                    <Tab.Screen name="Accueil" component={ AccueilUnregistered } />
                ) : (
                    <Tab.Screen name="AccueilRegistered" component={ AccueilRegistered } />
                )}
                
                <Tab.Screen name="Carte" component={ Map } />

                { !retrieveData('isLoggedIn') && (
                    <Tab.Screen name="Carte2" component={ Map } />
                )}
            </Tab.Navigator>
        </NavigationContainer>
    )
}
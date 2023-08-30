import React, { useState } from 'react';
import AccueilUnregistered from "./src/app/accueil/AccueilUnregistered";
import Map from "./src/app/map/MapPage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccueilRegistered from "./src/app/accueil/AccueilRegistered";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const Tab = createBottomTabNavigator();

    console.log("isLoggedin :D == ", isLoggedIn);
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Accueil">
                    {() => <AccueilUnregistered loggedIn={ isLoggedIn } setLoggedIn={ setIsLoggedIn } />}
                </Tab.Screen>
                <Tab.Screen name="AccueilRegistered" component={ AccueilRegistered } />
                <Tab.Screen name="Carte" component={ Map } />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
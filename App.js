import React, { useState } from 'react';
import AccueilUnregistered from "./src/app/accueil/AccueilUnregistered";
import Map from "./src/app/map/MapPage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AccueilRegistered from "./src/app/accueil/AccueilRegistered";
import ShowBoite from './src/app/boite/ShowBoite';
import QRCode from './src/app/services/qrcode';
import BorrowedBook from './src/app/boite/BorrowedBooks';
import Logout from './src/app/accueil/Logout';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [boxInfos, setBoxInfos] = useState({});
  const [listBox, setListBox] = useState({})
  
  function Home() {
    const Tab = createBottomTabNavigator();
    
    return (
      <Tab.Navigator>
        {/* Tab Navigator = barre du bas (avec les boutons) */}
            { isLoggedIn ? (
              <Tab.Screen name="AccueilRegistered">
                {() => <AccueilRegistered setBoxInfos={ setBoxInfos } />}
              </Tab.Screen>
            ) : (
                <Tab.Screen name="Accueil">
                  {() => <AccueilUnregistered setLoggedIn={ setIsLoggedIn } />}
                </Tab.Screen>
            )}
            <Tab.Screen name="Carte">
              {() => <Map setBoxInfos={ setBoxInfos } isLoggedIn={ isLoggedIn } />}
            </Tab.Screen>
            { isLoggedIn && (
              <>
                <Tab.Screen name="Livres Empruntés">
                  {() => <BorrowedBook />}
                </Tab.Screen>
                <Tab.Screen name="Se déconnecter">
                  {() => <Logout setIsLoggedIn={ setIsLoggedIn } /> }
                </Tab.Screen>
              </>
            )}
      </Tab.Navigator>
    );
  }
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        {/* Stacks Screen = les routes (a appeler par example "Boites" pour aller sur ShowBoite) */}
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={ Home }
            options={{ headerShown: false }}
          />

            <Stack.Screen name="Boites">
                {() => <ShowBoite boxInfos={ boxInfos } setBoxInfos={ setBoxInfos } listBox={ listBox } setListBox={ setListBox } isLoggedIn={ isLoggedIn } />}
              </Stack.Screen>
              <Stack.Screen name="QRCode">
                {() => <QRCode setListBox={ setListBox } />}
              </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
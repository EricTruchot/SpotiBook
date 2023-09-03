import React, { useState } from 'react';
import AccueilUnregistered from "./src/app/accueil/AccueilUnregistered";
import Map from "./src/app/map/MapPage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AccueilRegistered from "./src/app/accueil/AccueilRegistered";
import ShowBoite from './src/app/boite/ShowBoite';
import QRCode from './src/app/services/qrcode';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [boxInfos, setBoxInfos] = useState({});
  const [listBox, setListBox] = useState({})
  
  function Home() {
    const Tab = createBottomTabNavigator();
    
    return (
      <Tab.Navigator 
   
      screenOptions={{
        tabBarActiveTintColor: "#242331",
        // f9a03f
        tabBarInactiveTintColor: "grey",
        headerTintColor: "#242331",
        // EEF4D4
        cardStyle: {
           backgroundColor: '#E0F5EA',
        },
        headerStyle: {
          backgroundColor: '#E0F5EA',
          // 121619
       },
       tabBarStyle:{
        backgroundColor:'#E0F5EA',
        // 242331
        // height:60,
      },
      tabBarItemStyle:{
        backgroundColor:'#E0F5EA',
        // marginHorizontal:5,
        borderRadius:2,
      },
      tabBarLabelStyle:{
        color:'#242331',
      },
      // tabBarIconStyle: {
      //  color:'#242331',
      //  focused:'orange'
      // }
     }}
     >
            { isLoggedIn ? (
              <Tab.Screen name="AccueilRegistered">    
                {() => 
                
                <AccueilRegistered setBoxInfos={ setBoxInfos } />}
              </Tab.Screen>
            ) : (
                <Tab.Screen name="Accueil"
                options={{
                  tabBarLabel: 'Home',
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="home" color={color} size={size} />
                  ),
                }}>
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
        <Stack.Navigator
        screenOptions={{
          headerTintColor: "#242331",
          // EEF4D4
          cardStyle: {
             backgroundColor: '#848FA5',
          },
          headerStyle: {
            backgroundColor: '#ECDCB0',
            // 121619
         }
       }}>
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
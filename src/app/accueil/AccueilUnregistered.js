import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { StyleSheet } from "react-native";
import { retrieveData, storeData, removeData } from '../services/localStorageUsers.js';
import { getUserById } from '../services/User';

export default function AccueilUnregistered() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idk, setIdk] = useState([]);

  useEffect(() => {
    (async () => {
        await getAllSpots();
      })();
    }, []);

    async function getAllSpots() {
        const allSpots = await getUserById("03b04b8e-1b73-4954-a4d8-fb76a6feda19");
        setIdk(allSpots)
    }

    console.log(idk);

  return (
    <>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Page d'accueil</Text>
      <Button
        onPress={() => {storeData('isLoggedIn', 'yes'), setIsLoggedIn(true)}}
        title="Connexion"
        color="#841584"
        />

      <Button
        onPress={() => {removeData('isLoggedIn'), setIsLoggedIn(false)}}
        title="Déco"
        color="#841584"
        />

        {isLoggedIn ? <Text>Hello</Text> : <Text>No</Text>}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
})
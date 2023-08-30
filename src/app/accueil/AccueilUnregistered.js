import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { StyleSheet } from "react-native";
import { storeData, removeData } from '../services/localStorageUsers.js';
import { getUserById } from '../services/api.js';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function AccueilUnregistered({ loggedIn, setLoggedIn }) {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      ( async () => {
        // let result = await ResultsFetchAuthentification(data);
        // console.log(data)
      })();
  
    };

  return (
    <>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Page d'accueil</Text>
      <Button
        onPress={() => {storeData('isLoggedIn', 'yes'), setLoggedIn(true)}}
        title="Connexion"
        color="#841584"
        />

      <Button
        onPress={() => {removeData('isLoggedIn'), setLoggedIn(false)}}
        title="Déco"
        color="#841584"
        />

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: 400, width: 400 }}
        />
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



  // useEffect(() => {
  //   (async () => {
  //       await getAllSpots();
  //     })();
  //   }, []);

  //   async function getAllSpots() {
  //       const allSpots = await getUserById("03b04b8e-1b73-4954-a4d8-fb76a6feda19");
  //       setIdk(allSpots)
  //   }

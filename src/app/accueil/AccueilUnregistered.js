import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { StyleSheet } from "react-native";
import { storeData, removeData } from '../services/localStorageUsers.js';
import { getAllBooksFromIdBox, getUserById } from '../services/api.js';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function AccueilUnregistered({ setLoggedIn }) {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [showQrCode, setShowQrCode] = useState(false);
  const [error, setError] = useState('');

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
        if (data?.split('/')[0] != 'utilisateur') {
          setError("Vous devez scannez un QRCode d'utilisateur");
          setScanned(false);
          return;
        }

        let result = await getUserById(data?.split('/')[1]);
        let parsedResult = JSON.parse(result)

        storeData('isLoggedIn', JSON.stringify(parsedResult));
        setLoggedIn(true);
      })();
  
    };

  return (
    <>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Page d'accueil</Text>

    {/* A metre en rouge & + gros */}
      {error && (
        <Text>{error}</Text>
      )}

      {!showQrCode && (
        <Button title="Se connecter" onPress={() => setShowQrCode(true) } />
      )}

        {showQrCode && (
          <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: 400, width: 400 }}
        />
        )}
      
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
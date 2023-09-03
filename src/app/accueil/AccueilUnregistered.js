import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { StyleSheet } from "react-native";
import { storeData } from '../services/localStorageUsers.js';
import { getUserById } from '../services/api.js';
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
    <View style={{ flex: 1, justifyContent: 'space-even', alignItems: 'center' }}>
      <Text style={styles.spotiBook}>SpotiBook</Text>
      <Text style={styles.scanUser}>Avec SpotiBook, vous pouvez désormais découvrir et partager des livres passionnants dans des boîtes de livres mises à disposition en toute simplicité.</Text>
      <Text style={styles.scanUser}>Veuillez scanner votre QR Code d'utilisateur pour commencer:</Text>
    {/* A metre en rouge & + gros */}
      { error && (
        <Text style={styles.error}>{error}</Text>
      )}

     
        { showQrCode && (
          <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: 300, width: 400 ,marginBottom:20}}
        />
        )}
        {!showQrCode ? (
        <Button title="Se connecter" onPress={() => setShowQrCode(true) } />
      ) : (
        <Button title="Annuler" onPress={() => setShowQrCode(false) } />
      )}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  // map: {
  //   width: '100%',
  //   height: '100%',
  // },
  spotiBook: {
    fontSize:20,
    textAlign:'center',
    marginVertical:20
    // marginBottom:4,
  },
  // scanUser: {
  //   fontSize:16,
  //   textAlign:'center',
  //   marginBottom:4,
  // },
  scanUser: {
    width:'90%',
    fontSize:14,
    textAlign:'center',
    marginBottom:10,
  },
  error: {
    width:'90%',
    fontSize:22,
    textAlign:'center',
    marginBottom:10,
    color: 'red',
    fontWeight: '600'
  }
})
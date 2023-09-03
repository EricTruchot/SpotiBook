import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getBoxById } from '../services/api';
import { retrieveData } from '../services/localStorageUsers';

export default function AccueilRegistered({ setBoxInfos }) {
    const [scanned, setScanned] = useState(false);
    const [showCodeBar, setShowCodeBar] = useState(false);
    const [error, setError] = useState('');
    const [userInfo, setuserInfo] = useState({});

      useEffect(() => {
        (async () => {
            const user = await retrieveData('isLoggedIn')
            const parsedUser = JSON.parse(user);
        setuserInfo(parsedUser);
        })();
    }, []);

    const navigation = useNavigation();

    const navigateToScreen = () => {
        navigation.navigate('Boites');
    };
    
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        ( async () => {
            if (data?.split('/')[0] != 'boite') {
                setError("Vous devez scannez un QRCode de boite");
                setScanned(false);
                return;
              }
          let result = await getBoxById(data?.split('/')[1]);
          let parsedResult = JSON.parse(result)
          setBoxInfos(parsedResult)
          navigateToScreen();
        })();
    
      };
  return (
    <>
    <View style={styles.container}>
        <Text style={styles.welcome}>Bienvenue {userInfo?.prenom} {userInfo?.nom}</Text>

        <Text style={styles.scanbox}>Vous pouvez maintenant scanner la boite dans laquelle vous voulez emprunter ou rendre un livre ou simplement parcourir l'application.</Text>
       
        {/* A metre en rouge & + gros */}
        {error && (
            <Text style={styles.error}>{error}</Text>
        )}

        { showCodeBar && (
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 400, width: 400 }}
                />
        ) }
        {!showCodeBar ? (
            <Button title="Scanner la boite" onPress={() => setShowCodeBar(true) } />
        ) : (
            <Button title="Annuler" onPress={() => setShowCodeBar(false) } />
        )}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-even',
        alignItems: 'center'
    },
 
        welcome: {
          fontSize:20,
          textAlign:'center',
          marginVertical:16
        },

        scanbox: {
          width:'90%',
          fontSize:14,
          textAlign:'center',
          marginBottom:0,
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
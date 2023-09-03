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
        <Text>Bienvenue {userInfo?.prenom} {userInfo?.nom}</Text>

        <Text>Vous pouvez maintenant scanner la boite dans laquelle vous voulez emprunter ou rendre un livre ou simplement parcourir l'application.</Text>
        {!showCodeBar && (
            <Button title="Scanner la boite" onPress={() => setShowCodeBar(true) } />
        )}

        {/* A metre en rouge & + gros */}
        {error && (
            <Text>{error}</Text>
        )}

        { showCodeBar && (
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 400, width: 400 }}
                />
        ) }
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
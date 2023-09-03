import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRoute } from '@react-navigation/native';
import { borrowBook, getBookById, returnBook } from '../services/api';

export default function QRCode({ setListBox }) {
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const [error, setError] = useState('');

  const route = useRoute();
  const { state, idBox } = route.params;

    const navigateToScreen = async () => {
      navigation.goBack();
    };
    
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        ( async () => {

          if (data?.split('/')[0] != 'livre') {
            setError("Vous devez scannez un QRCode de livre");
            setScanned(false);
            return;
          }

          let result = await getBookById(data?.split('/')[1]);
          let parse = JSON.parse(result);

          if (state == 'borrow') {
            if (parse?.etat != 'boite/' + idBox) {
              setError('Vous devez scannez un livre présent dans cette boite');
              setScanned(false);
              return;
            }
            const updatedList = await borrowBook(parse.id, idBox);
            const parsedList = JSON.parse(updatedList);

            setListBox(parsedList);
          } else if (state == 'return') {
            if (!parse?.etat.startsWith('user/')) {
              setError("Votre QRcode n'est pas valide");
              setScanned(false);
              return;
            }
            const updatedList = await returnBook(parse.id, idBox);
            const parsedList = JSON.parse(updatedList);

            setListBox(parsedList);
          }
          navigateToScreen();
        })();
    
      };
  return (
    <>
    <View style={styles.container}>
        {state == 'borrow' ? (
        <Text>Veuillez scanner le livre que vous voulez emprunter.</Text>
        ): (
          <Text>Veuillez scanner le livre que vous voulez rendre.</Text>
        )}

        {/* A metre en rouge & + gros */}
        {error && (
            <Text>{error}</Text>
        )}

        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }}
            />
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
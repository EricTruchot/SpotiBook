import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';
import { getAllBooksFromIdBox } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export default function ShowBoite({ boxInfos, listBox, setListBox, isLoggedIn }) {
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            let result = await getAllBooksFromIdBox(boxInfos?.id);
            setListBox(JSON.parse(result))
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Text>{ boxInfos?.nom }</Text>
            { listBox && listBox.length != 0 ? (
                <>
                <Text>Voici la liste des livre disponible dans cette boite:</Text>
                    <FlatList
                    data={listBox}
                    renderItem={({item}) =>  
                    <>
                    <View>
                        <Text>Titre: {item?.nom} de </Text>
                        <Text>Auteur: {item?.auteur}</Text>
                        <Text>Description: {item?.résumé}</Text>
                    </View>
                    </>
                }
                    keyExtractor={item => item?.id}
                />
                </>
            ) : (
                <Text>Il n'y a aucun livre dans cette boite actuellement.</Text>
            )}
            
                 

            { isLoggedIn ? (
                <>
                { !listBox && (
                    <Button
                        title="Emprunter un livre"
                        color="#841584"
                        onPress={() => navigation.navigate('QRCode', { state: 'borrow', idBox: boxInfos?.id }) }
                        />
                )}
                    <Button
                        title="Rendre un livre"
                        color="#841584"
                        onPress={() => navigation.navigate('QRCode', { state: 'return', idBox: boxInfos?.id }) }
                        />
                       
                </>
            ) : (
                <Text>Vous devez être connecter pour pouvoir emprunter pour rendre un livre</Text>
            )}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: '100%',
    },
})
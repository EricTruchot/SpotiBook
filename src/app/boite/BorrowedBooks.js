import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';
import { retrieveData } from '../services/localStorageUsers.js';
import { useNavigation } from '@react-navigation/native';
import { getBookByUser } from '../services/api.js';

export default function BorrowedBook() {
    const [userInfo, setUserInfo] = useState({})
    const [listBox, setListBox] = useState({})
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const user = await retrieveData('isLoggedIn');
            const parsedUser = JSON.parse(user);
            setUserInfo(parsedUser);
            let result = await getBookByUser(parsedUser?.id);
            setListBox(JSON.parse(result))
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Voici la liste des livres que vous avez emprunter actuellement { userInfo?.prenom }:</Text>

            { listBox && listBox.length != 0 ? (
                <FlatList
                    data={listBox}
                    renderItem={({item}) =>  
                    <>
                        <Text>{item?.nom} de {item?.auteur}</Text>
                    </>
                }
                    keyExtractor={item => item?.id}
                />
            ) : (
                <Text>Vous n'avez emprunter aucun livres.</Text>
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
import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
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
           

            { listBox && listBox.length != 0 ? (
            <>
                 <Text style={styles.title}>Voici la liste des livres que vous avez emprunté actuellement { userInfo?.prenom }:</Text>
                <FlatList
                    
                    data={listBox}
                    renderItem={({item}) =>  
                    <View style={styles.card}>
                         <Image
                        source={{ uri: item?.image }}
                        style={{ width: 190, height: 265 }}
                    />
                        <Text>{item?.nom} de {item?.auteur}</Text>
                    </View>
                }
                    keyExtractor={item => item?.id}
                />
            </>
            ) : (
                <Text>Vous n'avez emprunté aucun livres.</Text>
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
    card: {
        flex: 1,
        padding:8,
        justifyContent: 'center',
        alignItems: 'center',
        // width: '90%',
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#242331',
        marginVertical:5
        
    },
    title: {
        marginVertical:20,
        fontWeight:'600'
    }
})
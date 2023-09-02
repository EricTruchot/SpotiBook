import axios from "axios";
import { retrieveData } from "./localStorageUsers";

export async function getUserById(id) {
    const result = await axios.get("https://spoti-book-rest-eta.vercel.app/users/" + id)
    return JSON.stringify(result.data);
}

export async function getBoxById(id) {
    const result = await axios.get("https://spoti-book-rest-eta.vercel.app/boites/" + id)
    return JSON.stringify(result.data);
}

export async function getAllBoxes() {
    const result = await axios.get("https://spoti-book-rest-eta.vercel.app/boites")
    return JSON.stringify(result.data);
}

export async function getBookById(id) {
    const result = await axios.get("https://spoti-book-rest-eta.vercel.app/livres/" + id)
    return JSON.stringify(result.data);
}

export async function borrowBook(id) {
    const user = await retrieveData('isLoggedIn')
    const parsedUser = JSON.parse(user)
    axios.patch("https://spoti-book-rest-eta.vercel.app/livres/" + id, {
        etat: 'user/' + parsedUser?.id,
    })

    return 'borrow done';
}

export async function returnBook(id) {
    const user = await retrieveData('isLoggedIn')
    console.log('user: ', user);
    const parsedUser = JSON.parse(user)
    axios.patch("https://spoti-book-rest-eta.vercel.app/livres/" + id, {
        etat: 'user/' + parsedUser?.id,
    })

    return 'borrow done';
}
// les données dans états sont = nom de la table + / + nom de l'id
// si c'est un user, ce sera : user/id (l'id qui est un guid)
// si c'est une boite = boite/1 (d'ou le filter)
// demander a eric la logique
export async function getAllBooksFromIdBox(id) {
    const data = await axios.get("https://spoti-book-rest-eta.vercel.app/livres");
    const dataArray = Object.values(data?.data);
    const result2 = dataArray?.filter(res => res?.etat.split('/')[0] === 'boite' && res?.etat.split('/')[1] == id)
    return JSON.stringify(result2);
}
import axios from "axios";

export async function getUserById(id) {
    const result = await axios.get("https://spoti-book-rest.vercel.app/users/" + id)
    return JSON.stringify(result.data);
}

export async function getBoxById(id) {
    const result = await axios.get("https://spoti-book-rest.vercel.app/boites/" + id)
    return JSON.stringify(result.data);
}

export async function getAllBoxes() {
    const result = await axios.get("https://spoti-book-rest.vercel.app/boites")
    return JSON.stringify(result.data);
}

// les données dans états sont = nom de la table + / + nom de l'id
// si c'est un user, ce sera : user/id (l'id qui est un guid)
// si c'est une boite = boite/1 (d'ou le filter)
// demander a eric la logique
export async function getAllBooksFromIdBox(id) {
    const data = await axios.get("https://spoti-book-rest.vercel.app/livres");
    const dataArray = Object.values(data?.data);
    const result2 = dataArray?.filter(res => res?.etat.split('/')[0] === 'boite' && res?.etat.split('/')[1] == id)
    return JSON.stringify(result2);
}
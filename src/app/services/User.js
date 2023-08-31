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
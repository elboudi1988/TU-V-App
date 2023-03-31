import axios from "axios";

async function fetchUserData(token) {
  try {
    const response = await axios.get("http://localhost:8000/api/getuser", {
      headers: {
        Authorization: `Bearer ${token}`, // Stellen Sie sicher, dass dies dem Token-Typ entspricht, den Ihre API erwartet
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
export default fetchUserData;

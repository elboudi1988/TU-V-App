import axios from "axios";

async function useFetchUserData(token) {
  try {
    const response = await axios.get("http://localhost:8000/api/getuser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("User data response:", response.data); // Log the entire response
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export default useFetchUserData;

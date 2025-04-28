import axios from "axios"

export const getAdmin = async() => {
    try {
        const response = await axios.get("http://localhost:5000/api/admin")
        console.log("Admin fetched successfully in service", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error in getAdmin in service", error);
    }
   
}
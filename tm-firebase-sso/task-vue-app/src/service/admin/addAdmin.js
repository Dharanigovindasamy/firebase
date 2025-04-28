import axios from "axios"

export const addAdmin = async (adminData) => {
    try{
        const response = await axios.post("http://localhost:5000/api/admin", adminData);
        console.log("Admin added successfully in service", response.data);
        return response.data;
    }catch(error) {
        console.error("Error in addAdmin in service", error);
    }

}
import axios from "axios";

export const deletedTask = async (taskId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/task/${taskId}`);
        console.log("Task deleted successfully in service", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in delete Task in service", error);
    }
}
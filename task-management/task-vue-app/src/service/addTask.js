// import { BASE_URL } from "@/store/util";
// import axios from "axios";

//import { ref } from "vue";

// const addTaskUrl = axios.create({
//     baseURL: BASE_URL
// });

// export const addTask = async (task) => {
//     try {
//         const response = await addTaskUrl.post("/tasks/AddTask", task, 
//              { headers: {
//             "Content-Type": "application/json" 
//         }}
//         );
//         console.log("Task added successfully", response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Error in addTask", error);
//     }
// }

// import {ref} from vue;
// export const addTask = async (task) => {
//     try {
//         const tasks = ref([
//             { taskId: 54321, taskName: "Design UI", category: "Development", status: "Pending" },
//             { taskId: 54322, taskName: "Write API", category: "Backend", status: "In Progress" },
//             { taskId: 54323, taskName: "Testing", category: "QA", status: "Completed" }
//           ]);
//           console.log("Task added successfully", tasks.value);
//                  return response.data;
//     } catch (error) {
//                  console.error("Error in addTask", error);
//             }


// }
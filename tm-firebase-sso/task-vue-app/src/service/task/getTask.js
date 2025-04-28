// import { BASE_URL } from "@/store/util";
// import axios from "axios";

// const getTaskUrl = axios.create({
//     baseURL: BASE_URL
// });

// export const getTask = async () => {
//     try {
//         const response = await getTaskUrl.get("/tasks");
//         return response.data;
//     } catch (error) {
//         console.error("Error in getTask", error);
//     }
// } 

// import { ref } from "vue";

// export const getTask = () => {
//   try {
//     const tasks = ref([
//       { taskId: 54321, taskName: "Design UI", category: "Development", status: "Pending" },
//       { taskId: 54322, taskName: "Write API", category: "Backend", status: "In Progress" },
//       { taskId: 54323, taskName: "Testing", category: "QA", status: "Completed" },
//     ]);
//     console.log("Tasks retrieved successfully", tasks.value);
//     return tasks.value; // Return the plain array
//   } catch (error) {
//     console.error("Error in getTask", error);
//     return [];
//   }
// };

import { useTaskStore } from "@/store/taskStore";
import axios from "axios";

export const getTask = async() => {
  const taskStore = useTaskStore(); 
  try {
    // const staticTasks = [
    //   { taskId: 54321, taskName: "Design UI", category: "Development", status: "Pending" },
    //   { taskId: 54322, taskName: "Write API", category: "Backend", status: "In Progress" },
    //   { taskId: 54323, taskName: "Testing", category: "QA", status: "Completed" },
    // ];

    // const staticTasks = await axios.get("http://localhost:5000/api/tasks")
    //   .then((response) => {
    //     console.log("Static tasks retrieved successfully", response.data, staticTasks);
    //     return response.data;
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching static tasks:", error);
    //     return [];
    //   });

    const response = await axios.get("http://localhost:5000/api/task");
    const staticTasks = Array.isArray(response.data?.$values)
      ? response.data.$values
      : [];
    console.log("Static tasks retrieved successfully", staticTasks);

    const existingTasks = taskStore.tasks || [];
    const allTasks = [
      ...staticTasks,
      // ...taskStore.createTask,
      ...existingTasks.filter((task) =>
        !staticTasks.some((staticTask ) => staticTask.taskId === task.taskId)
      ),
    ];    
    console.log("Tasks retrieved successfully", allTasks);
    return allTasks;
  } catch (error) {
    console.error("Error in getTask", error);
    return [];
  }
};
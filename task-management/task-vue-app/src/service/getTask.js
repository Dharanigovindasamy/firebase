// // import { BASE_URL } from "@/store/util";
// // import axios from "axios";

// // const getTaskUrl = axios.create({
// //     baseURL: BASE_URL
// // });

// // export const getTask = async () => {
// //     try {
// //         const response = await getTaskUrl.get("/tasks");
// //         return response.data;
// //     } catch (error) {
// //         console.error("Error in getTask", error);
// //     }
// // } 

// // import { ref } from "vue";

// // export const getTask = () => {
// //   try {
// //     const tasks = ref([
// //       { taskId: 54321, taskName: "Design UI", category: "Development", status: "Pending" },
// //       { taskId: 54322, taskName: "Write API", category: "Backend", status: "In Progress" },
// //       { taskId: 54323, taskName: "Testing", category: "QA", status: "Completed" },
// //     ]);
// //     console.log("Tasks retrieved successfully", tasks.value);
// //     return tasks.value; // Return the plain array
// //   } catch (error) {
// //     console.error("Error in getTask", error);
// //     return [];
// //   }
// // };

import { useTaskStore } from "@/store/taskStore";

export const getTask = () => {
  const taskStore = useTaskStore(); 
  try {
    const staticTasks = [
      { taskId: 54321, taskName: "Design UI", category: "Development", status: "Pending" },
      { taskId: 54322, taskName: "Write API", category: "Backend", status: "In Progress" },
      { taskId: 54323, taskName: "Testing", category: "QA", status: "Completed" },
    ];

    const existingTasks = taskStore.tasks || [];
    const allTasks = [
      ...staticTasks,
      // ...taskStore.createTask,
      ...existingTasks.filter((task) =>
        !staticTasks.some((staticTask) => staticTask.taskId === task.taskId)
      ),
    ];
   // const allTasks = [...staticTasks, ...taskStore.tasks];
    
    console.log("Tasks retrieved successfully", allTasks);
    return allTasks;
  } catch (error) {
    console.error("Error in getTask", error);
    return [];
  }
};





// import { db } from "@/Firebase";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   updateDoc,
//   doc,
// } from "firebase/firestore";

// // Collection reference
// const taskCollectionRef = collection(db, "tasks");

// // Fetch tasks from Firestore
// export const getTask = async () => {
//   try {
//     const querySnapshot = await getDocs(taskCollectionRef);
//     const tasks = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//     console.log("Fetched tasks:", tasks);
//     return tasks;
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     return [];
//   }
// };

// // Add a new task to Firestore
// export const addTask = async (task) => {
//   try {
//     const docRef = await addDoc(taskCollectionRef, task);
//     console.log("Task added with ID:", docRef.id);
//     return { ...task, id: docRef.id };
//   } catch (error) {
//     console.error("Error adding task:", error);
//   }
// };

// // Delete a task from Firestore
// export const deleteTask = async (taskId) => {
//   try {
//     await deleteDoc(doc(db, "tasks", taskId));
//     console.log("Task deleted:", taskId);
//   } catch (error) {
//     console.error("Error deleting task:", error);
//   }
// };

// // Update a task in Firestore
// export const updateTask = async (taskId, updatedTask) => {
//   try {
//     const taskDoc = doc(db, "tasks", taskId);
//     await updateDoc(taskDoc, updatedTask);
//     console.log("Task updated:", taskId);
//   } catch (error) {
//     console.error("Error updating task:", error);
//   }
// };

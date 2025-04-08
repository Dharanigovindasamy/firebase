// // // import { defineStore } from "pinia";
// // // import { getTask } from "@/service/getTask";
// // // //import { addTask } from "@/service/addTask";

// // // export const useTaskStore = defineStore("task", {
// // //   state: () => ({
// // //     tasks: [], 
// // //   }),
// // //   actions: {
// // //     async fetchTask() {
// // //       try {
// // //         const response = await getTask(); 
// // //         if (response) {
// // //           this.tasks = [...response]; 
          
// // //           console.log("Tasks fetched successfully", this.tasks);
// // //         } else {
// // //           console.error("No data received from API");
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching tasks:", error);
// // //       }
// // //     },
// // //     async createTask(task) {
// // //       try {
// // //         task.taskId = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].taskId + 1 : 1;
// // //         //const response = await addTask(task);
// // //         //console.log("Task added ", response);
// // //         this.tasks.push(task);
// // //         console.log("Task added successfully", this.tasks);
// // //       } catch (error) {
// // //         console.error("Error adding task:", error);
// // //       }
// // //     },
// // //     async deleteTask(taskId) {
// // //       try {
// // //         this.tasks = this.tasks.filter((task) => task.id !== taskId);
// // //       } catch (error) {
// // //         console.error("Error deleting task:", error);
// // //       }
// // //     },
// // //   },
// // // });



// // import { defineStore } from "pinia";
// // import { ref } from "vue";
// // import { getTask } from "@/service/getTask";
// // //import axios from "axios";

// // export const useTaskStore = defineStore("taskStore", () => {
// //   const tasks = ref([]);

// //   const fetchTask = async () => {
// //     // try {
// //     //   const response = await axios.get("http://localhost:5000/api/tasks"); 
// //     //   tasks.value = response.data;
// //     //   console.log("fetch tasks", tasks.value);
// //     // } catch (error) {
// //     //   console.error("Error fetching tasks:", error);
// //     // }
// //     try {
// //                const response = await getTask(); 
// //                console.log(response, "get task response");
// //                if (response) {
// //                 tasks.value = [...response]; 
                
// //                  console.log("Tasks fetched successfully", tasks.value);
// //                } else {
// //                  console.error("No data received from API");
// //                }
// //             } catch (error) {
// //              console.error("Error fetching tasks:", error);
// //              }
// //   };


// //   const createTask = (newTask) => {
// //     tasks.value.push(newTask);
// //     console.log(tasks.value,'instore');
// //   };

// //   const deleteTask = (taskId) => {
// //     console.log("taskId after delete", taskId);
// //     tasks.value = tasks.value.filter((task) => task.id !== taskId);
// //     console.log(tasks.value,'delete in store');
// //   };
 

// //   return { tasks, fetchTask, createTask, deleteTask };
// // });



import { defineStore } from "pinia";
import { ref } from "vue";
import { getTask } from "@/service/getTask";
//import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
//import { db } from "@/Firebase"; // Import Firestore instance

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);

  const fetchTask = async () => {
    try {
      const response = await getTask();
      console.log(response, "get task response");

      // const querySnapshot = await getDocs(collection(db, "tasks"));
      // tasks.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))


      if (response && Array.isArray(response)) {
        tasks.value = response;
       // tasks.value = [...response];
        console.log("Tasks fetched successfully", tasks.value);
      } else {
        console.error("No data received or data is not an array");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  

  const createTask = (newTask) => {
    if (!newTask.taskId) {
      newTask.taskId =
        tasks.value.length > 0 ? tasks.value[tasks.value.length - 1].taskId + 1 : 1;
    }
    newTask.status = "Pending";
    if (!tasks.value.some((task) => task.taskId === newTask.taskId)) {
      tasks.value.push(newTask);
      console.log("Task added successfully", tasks.value);
    }
    // tasks.value.push(newTask);
    // console.log("Task added successfully", tasks.value, "in store");
  };

  const deleteTask = (taskId) => {
    console.log("Deleting task with taskId:", taskId);
    tasks.value = tasks.value.filter((task) => task.taskId !== taskId);
    console.log("Tasks after deletion:", tasks.value, "in store");
  };

  const updateTask = (updatedTask) => {
    const index = tasks.value.findIndex((t) => t.taskId === updatedTask.taskId);
    if (index !== -1) {
      tasks.value[index] = { ...updatedTask }; 
    }
    console.log("updated task in store ", updateTask);
  };

  return { tasks, fetchTask, createTask, deleteTask, updateTask };
});




// import { defineStore } from "pinia";
// import { ref } from "vue";
// import { getTask, addTask, deleteTask, updateTask } from "@/service/getTask";

// export const useTaskStore = defineStore("taskStore", () => {
//   const tasks = ref([]);

//   // Fetch tasks from Firestore
//   const fetchTask = async () => {
//     tasks.value = await getTask();
//   };

//   // Add task to Firestore
//   const createTask = async (newTask) => {
//     const taskWithId = await addTask(newTask);
//     if (taskWithId) {
//       tasks.value.push(taskWithId);
//     }
//   };

//   // Delete task from Firestore
//   const removeTask = async (taskId) => {
//     await deleteTask(taskId);
//     tasks.value = tasks.value.filter((task) => task.id !== taskId);
//   };

//   // Update task in Firestore
//   const modifyTask = async (updatedTask) => {
//     await updateTask(updatedTask.id, updatedTask);
//     const index = tasks.value.findIndex((task) => task.id === updatedTask.id);
//     if (index !== -1) {
//       tasks.value[index] = updatedTask;
//     }
//   };

//   return { tasks, fetchTask, createTask, removeTask, modifyTask };
// });




// import { defineStore } from "pinia";
// import { ref } from "vue";
// import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import { db } from "@/Firebase"; // Import Firestore instance

// export const useTaskStore = defineStore("taskStore", () => {
//   const tasks = ref([]);

//   // Fetch tasks from Firestore
//   const fetchTask = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "tasks"));
//       tasks.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       console.log("Tasks fetched successfully", tasks.value);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   // Add a new task to Firestore
//   const createTask = async (newTask) => {
//     try {
//       newTask.status = "Pending"; // Default status
//       const docRef = await addDoc(collection(db, "tasks"), newTask);
//       tasks.value.push({ id: docRef.id, ...newTask });
//       console.log("Task added successfully", newTask);
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   // Delete a task from Firestore
//   const deleteTask = async (taskId) => {
//     try {
//       await deleteDoc(doc(db, "tasks", taskId));
//       tasks.value = tasks.value.filter(task => task.id !== taskId);
//       console.log("Task deleted successfully", taskId);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   // Update a task in Firestore
//   const updateTask = async (updatedTask) => {
//     try {
//       const taskRef = doc(db, "tasks", updatedTask.id);
//       await updateDoc(taskRef, updatedTask);
//       const index = tasks.value.findIndex(task => task.id === updatedTask.id);
//       if (index !== -1) tasks.value[index] = { ...updatedTask };
//       console.log("Task updated successfully", updatedTask);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   return { tasks, fetchTask, createTask, deleteTask, updateTask };
// });

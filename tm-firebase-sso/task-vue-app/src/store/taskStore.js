// // import { defineStore } from "pinia";
// // import { getTask } from "@/service/getTask";
// // //import { addTask } from "@/service/addTask";

// // export const useTaskStore = defineStore("task", {
// //   state: () => ({
// //     tasks: [], 
// //   }),
// //   actions: {
// //     async fetchTask() {
// //       try {
// //         const response = await getTask(); 
// //         if (response) {
// //           this.tasks = [...response]; 

// //           console.log("Tasks fetched successfully", this.tasks);
// //         } else {
// //           console.error("No data received from API");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching tasks:", error);
// //       }
// //     },
// //     async createTask(task) {
// //       try {
// //         task.taskId = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].taskId + 1 : 1;
// //         //const response = await addTask(task);
// //         //console.log("Task added ", response);
// //         this.tasks.push(task);
// //         console.log("Task added successfully", this.tasks);
// //       } catch (error) {
// //         console.error("Error adding task:", error);
// //       }
// //     },
// //     async deleteTask(taskId) {
// //       try {
// //         this.tasks = this.tasks.filter((task) => task.id !== taskId);
// //       } catch (error) {
// //         console.error("Error deleting task:", error);
// //       }
// //     },
// //   },
// // });



// import { defineStore } from "pinia";
// import { ref } from "vue";
// import { getTask } from "@/service/getTask";
// //import axios from "axios";

// export const useTaskStore = defineStore("taskStore", () => {
//   const tasks = ref([]);

//   const fetchTask = async () => {
//     // try {
//     //   const response = await axios.get("http://localhost:5000/api/tasks"); 
//     //   tasks.value = response.data;
//     //   console.log("fetch tasks", tasks.value);
//     // } catch (error) {
//     //   console.error("Error fetching tasks:", error);
//     // }
//     try {
//                const response = await getTask(); 
//                console.log(response, "get task response");
//                if (response) {
//                 tasks.value = [...response]; 

//                  console.log("Tasks fetched successfully", tasks.value);
//                } else {
//                  console.error("No data received from API");
//                }
//             } catch (error) {
//              console.error("Error fetching tasks:", error);
//              }
//   };


//   const createTask = (newTask) => {
//     tasks.value.push(newTask);
//     console.log(tasks.value,'instore');
//   };

//   const deleteTask = (taskId) => {
//     console.log("taskId after delete", taskId);
//     tasks.value = tasks.value.filter((task) => task.id !== taskId);
//     console.log(tasks.value,'delete in store');
//   };


//   return { tasks, fetchTask, createTask, deleteTask };
// });



import { defineStore } from "pinia";
import { ref } from "vue";
import { getTask } from "@/service/task/getTask";
import { addTask } from "@/service/task/addTask";
import { updatedTask } from "@/service/task/updatedTask";
import { deletedTask } from "@/service/task/deletedTask";
export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);

  // const fetchTask = async () => {
  //   try {
  //     const response = await getTask();
  //     console.log(response, "get task response");
  //     if (response) {
  //       // Merge fetched tasks with existing tasks, ensuring no duplicates
  //       const existingTaskIds = new Set(tasks.value.map((task) => task.taskId));

  //       const newTasks = response.filter((task) => !existingTaskIds.has(task.taskId));

  //       tasks.value = [...tasks.value, ...newTasks]; // Keep existing and add new
  //       console.log("Tasks fetched successfully", tasks.value);
  //     } else {
  //       console.error("No data received from getTask");
  //     }

  //   } catch (error) {
  //     console.error("Error fetching tasks:", error);
  //   }
  // };

  const fetchTask = async () => {
    try {
      const response = await getTask();
      console.log(response, "get task response");

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


  const createTask = async (newTask) => {
    if (!newTask.taskId) {
      newTask.taskId =
        tasks.value.length > 0 ? tasks.value[tasks.value.length - 1].taskId + 1 : 1;
    }
   
    newTask.status = "Pending";
    newTask.taskDescription = "Create the login page with materialui";
    newTask.assigneeId = 2;
      newTask.reporterId = 1;
      newTask.startedAt =  new Date().toISOString();
      const startDate = new Date();
      const estimatedDays = parseInt(newTask.estimatedTime) || 1; 
      const dueDate = new Date(startDate);
      dueDate.setDate(startDate.getDate() + estimatedDays);
      newTask.dueDate = dueDate.toISOString();

      newTask.priority = "High";
      newTask.comments = "Initial version needed by end of week";
      newTask.attachment = "login_sketch.png";
      newTask.projectId = 2

      console.log("Task added successfully", newTask);
      const response = await addTask(newTask);
      console.log("Task added successfully in store",response.data);
    if (!tasks.value.some((task) => task.taskId === newTask.taskId)) {
      tasks.value.push(newTask);
      console.log("Task added successfully", tasks.value);
    }
  };

  const deleteTask = async(taskId) => {
    console.log("Deleting task with taskId:", taskId);
    const response = await deletedTask(taskId);
    console.log("Task deleted successfully in service", response.data);
    tasks.value = tasks.value.filter((task) => task.taskId !== taskId);
    console.log("Tasks after deletion:", tasks.value, "in store");
  };

  const updateTask = async(updatedTaskData) => {
    console.log("Updating task with taskId:", updatedTaskData);
    const index = tasks.value.findIndex((t) => t.taskId === updatedTaskData.taskId);
    if (index !== -1) {
      tasks.value[index] = { ...updatedTaskData };
    }
    try {
      const result = await updatedTask(updatedTaskData);
      console.log(result); 
    } catch (err) {
      console.error("Error caught when calling updateTask:", err);
    }
  };

  return { tasks, fetchTask, createTask, deleteTask, updateTask };
});
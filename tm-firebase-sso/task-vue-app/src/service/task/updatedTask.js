// import { toRaw } from 'vue';
// import axios from 'axios';

// export const updatedTask = async (task) => {
//   try {
//     const plainTask = JSON.parse(JSON.stringify(toRaw(task)));
//     console.log("Updating task with taskId:", plainTask);

//     // Safely convert dates only if they're valid
//     if (plainTask.StartedAt && !isNaN(new Date(plainTask.StartedAt))) {
//       plainTask.StartedAt = new Date(plainTask.StartedAt).toISOString();
//     } else {
//       console.warn("Invalid or missing StartedAt:", plainTask.startedAt);
//       plainTask.StartedAt = null; // or skip assigning it
//     }

//     if (plainTask.DueDate && !isNaN(new Date(plainTask.DueDate))) {
//       plainTask.DueDate = new Date(plainTask.DueDate).toISOString();
//     } else {
//       console.warn("Invalid or missing DueDate:", plainTask.dueDate);
//       plainTask.DueDate = null; 
//     }
//      console.log("Task before update: ", plainTask.taskId, plainTask);
     
//     const response = await axios.put(`http://localhost:5000/api/task/${plainTask.taskId}`, plainTask);
//     console.log("Task updated successfully in service", response.data);
//     return response.data;

//   } catch (error) {
//     console.error("Error in update Task in service", error);
//   }
// };

import axios from "axios";

function mapToApiModel(task) {
  return {
    TaskId: task.taskId,
    TaskName: task.taskName,
    TaskDescription: task.taskDescription,
    Category: task.category,
    Status: task.status,
    AssigneeId: task.assigneeId,
    ReporterId: task.reporterId,
    StartedAt: task.startedAt,
    DueDate: task.dueDate,
    Priority: task.priority,
    Comments: task.comments,
    Attachment: task.attachment,
    ProjectId: task.projectId
  };
}
export const updatedTask = async (task) => {
  try {
    const payload = mapToApiModel(task);

    const response = await axios.put(
      `http://localhost:5000/api/task/${task.taskId}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("Task updated successfully:", response.data);
  } catch (err) {
    console.error("Error updating task:", err.response?.data || err.message);
    throw err;
  }
};

// src/models/Execution.js or .ts
export const createExecution = () => ({
    id: Date.now(), // unique ID
    assignee: "",
    date: new Date().toISOString(),
    comments: "",
    summary: "",
    issueType: "Task", // Example: 'Task', 'Bug', 'Feature'
    status: "To Do", // Example: 'To Do', 'In Progress', 'Done'
    priority: "Medium", // Example: 'Low', 'Medium', 'High,
    estimatedTime: 0,
    actualTime: 0,
    attachments: null

  });
  
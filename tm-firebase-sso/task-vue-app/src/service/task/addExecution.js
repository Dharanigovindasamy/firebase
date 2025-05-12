import axios from "axios";

export const addExecution = async (execution) => {
    // let attachmentBase64 = null;

    // if (execution.attachment) {
    //   try {
    //     attachmentBase64 = await toBase64(execution.attachment);
    //   } catch (err) {
    //     console.error("Failed to convert attachment to base64:", err);
    //   }
    // }

      const executionData = {
        Assignee: execution.assignee,
        Date: execution.date,
        Summary: execution.summary,
        Comments: execution.comments,
        IssueType: execution.issueType,
        Status: execution.status,
        Priority: execution.priority,
        EstimatedTime: execution.estimatedTime,
        ActualTime: execution.actualTime,
     //   Attachment: attachmentBase64,
        TaskId: execution.taskId,
      };
    //  console.log(attachmentBase64, "attachmentBase64");
      console.log(executionData, "executionData");  
      axios.post(`http://localhost:5000/api/tasks/${execution.taskId}/executions`, executionData)
        .then(response => {
          console.log("Execution added successfully", response.data);
        })
        .catch(error => {
          console.error("Error adding execution:", error);
        });
      
};

// function toBase64(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result); // base64 string
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   }

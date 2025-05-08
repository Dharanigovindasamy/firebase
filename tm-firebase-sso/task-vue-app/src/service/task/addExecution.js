

const addExecution = async (executionData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${executionData.taskId}/executions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(executionData),
      });
  
      if (!res.ok) throw new Error("Failed to add execution");
  
      const data = await res.json();
      console.log("Execution added:", data);
    } catch (error) {
      console.error("Error adding execution:", error);
    }
  };
  
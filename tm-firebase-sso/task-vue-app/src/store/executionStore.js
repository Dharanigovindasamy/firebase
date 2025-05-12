import { defineStore } from "pinia";
import { ref,  toRaw } from "vue";
import { addExecution } from "../service/task/addExecution";

export const useExecutionStore = defineStore("execution", () => {
  const executions = ref([]);

  const createExecution = async (executionData) => {
    try {
      const newExecution = await addExecution(toRaw(executionData));
      console.log(newExecution, "Execution added in store");
      executions.value.push(newExecution); 
    } catch (error) {
      console.error("Error in createExecution:", error);
    }
  };

  const updateExecution = (id, updatedData) => {
    const index = executions.value.findIndex((e) => e.id === id);
    if (index !== -1) {
      executions.value[index] = { ...executions.value[index], ...updatedData };
    }
  };

  const removeExecution = (id) => {
    executions.value = executions.value.filter((e) => e.id !== id);
  };

  return {
    executions,
    createExecution,
    updateExecution,
    removeExecution,
  };
});

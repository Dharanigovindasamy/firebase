import { defineStore } from "pinia";
import { ref } from "vue";
import { createExecution } from "../components/model/Execution.js";

export const useExecutionStore = defineStore("execution", () => {
  const executions = ref([]);

  const addExecution = (executionData) => {
    
    executions.value.push({
      ...createExecution(),
      ...executionData,
    });
    console.log(executions.value,'instore');
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
    addExecution,
    updateExecution,
    removeExecution,
  };
});

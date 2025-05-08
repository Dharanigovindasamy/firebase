<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTaskStore } from "@/store/taskStore";
import ExecutionModel from "@/components/model/ExecutionModel.vue";
import { watch } from "vue";

const showExecutionModal = ref(false); 
const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();
const isEditing = ref(false);

const taskId = route.params.id;

const task = computed(
  () => taskStore.tasks.find((t) => t.taskId == taskId) || {}
);

const editableTask = ref({ taskName: "", category: "", status: "" });

onMounted(() => {
  if (task.value) {
    editableTask.value = { ...task.value };
  }
});

watch(showExecutionModal, (newVal) => {
  document.body.style.overflow = newVal ? "hidden" : "auto";
});

const enableEdit = () => {
  isEditing.value = true;
};

const saveChanges = () => {
  const updatedTask = {
    ...task.value,
    taskName: editableTask.value.taskName,
    category: editableTask.value.category,
  };

  taskStore.updateTask(updatedTask);
//  taskStore.currentTask = updatedTask;
  console.log("task updated", task.value);
  console.log("updated tasks", updatedTask);
  isEditing.value = false;
  // alert("Tasks updated sucessfully");
  // router.push('/task');
};

const handleExecute = () => {
  showExecutionModal.value = true;
  console.log("task executed", task.value.taskId);
}

const cancelEdit = () => {
  editableTask.value = { ...task.value };
  isEditing.value = false;
  router.push({ name: "Home" });
};
</script>

<template>
  <div class="task-details-container">
    <h2>Task Details</h2>
    <form @submit.prevent="saveChanges">
      <div class="form-group">
        <label>Task ID:</label>
        <input type="text" v-model="editableTask.taskId" disabled />
      </div>

      <div class="form-group">
        <label>Task Name:</label>
        <input
          type="text"
          v-model="editableTask.taskName"
          :disabled="!isEditing"
        />
      </div>

      <div class="category-form-group">
        <label for="category">Category:</label>
        <select
          class="category-select"
          id="category"
          v-model="editableTask.category"
          :disabled="!isEditing"
        >
          <option value="Select one" disabled>Select one</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
          <option value="Cloud">Cloud</option>
        </select>
      </div>

      <div class="form-group">
        <label>Status:</label>
        <input type="text" v-model="editableTask.status" disabled />
      </div>

      <div class="buttons">
        <button
          v-if="!isEditing"
          @click="enableEdit"
          type="button"
          class="edit-btn"
        >
          Edit
        </button>
        <button v-if="isEditing" type="submit" @click = handleExecute class="save-btn">Execute</button>
        <button
          v-if="isEditing"
          @click="cancelEdit"
          type="button"
          class="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </form>

     <!-- Execution Modal -->
    <ExecutionModel
      v-if="showExecutionModal"
      :taskId="task.taskId"
      @close="showExecutionModal = false"
    />


  </div>
</template>

<style scoped>
.task-details-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
  padding: 10px;
  align-items: center;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:disabled {
  background: #e9ecef;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #007bff;
  color: white;
}

.save-btn {
  background-color: #28a745;
  color: white;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
}

.category-form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding: 10px;
  margin-bottom: 15px;
}
.category-select {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding: 10px;
  margin-bottom: 15px;
  background: #e9ecef;
}
</style>

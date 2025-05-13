<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTaskStore } from "@/store/taskStore";
import ExecutionModel from "@/components/model/ExecutionModel.vue";

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

const showExecutionModal = ref(false);
const isEditing = ref(false);

const taskId = route.params.id;
const task = computed(() => taskStore.tasks.find(t => t.taskId == taskId) || {});

const editableTask = ref({
  taskId: "",
  taskName: "",
  category: "",
  provider: "",
  serviceType: "",
  memory: 0,
  storage: 0,
  status: "",
  price: 0
});

onMounted(() => {
  if (task.value) {
    editableTask.value = { ...task.value };
  }
});

watch([
  () => editableTask.value.provider,
  () => editableTask.value.serviceType,
  () => editableTask.value.memory,
  () => editableTask.value.storage
], () => {
  editableTask.value.price = calculatePrice(
    editableTask.value.provider,
    editableTask.value.serviceType,
    Number(editableTask.value.memory),
    Number(editableTask.value.storage)
  );
});

watch(showExecutionModal, newVal => {
  document.body.style.overflow = newVal ? "hidden" : "auto";
});

const enableEdit = () => {
  isEditing.value = true;
};

const saveChanges = async () => {
  const updatedTask = { ...task.value, ...editableTask.value };
  await taskStore.updateTask(updatedTask);
  isEditing.value = false;
  showExecutionModal.value = true;
    console.log("task executed", task.value.taskId);
  alert("Task updated successfully!", task.value);
};

const cancelEdit = () => {
  editableTask.value = { ...task.value };
  isEditing.value = false;
  router.push({ name: "Home" });
};

const handleExecutionModalClose = () => {
  showExecutionModal.value = false;
  router.push({ name: task.value.category === "Cloud" ? "payment" : "Task" });
};

// const handleExecute = () => {

//   showExecutionModal.value = true;
// };

const calculatePrice = (provider, service, memory, storage) => {
  const rateMap = {
    AWS: { EC2: 0.12, S3: 0.02, Lambda: 0.08, RDS: 0.15 },
    Azure: { VM: 0.11, "Blob Storage": 0.03, Functions: 0.09, "SQL Database": 0.14 },
    GCP: { "Compute Engine": 0.10, "Cloud Storage": 0.025, "Cloud Functions": 0.07, "Cloud SQL": 0.13 },
    "Oracle Cloud": { Compute: 0.09, Storage: 0.02, Functions: 0.08, Database: 0.12 }
  };

  const baseRate = rateMap[provider]?.[service] || 0;
  return Number(((memory + storage) * baseRate).toFixed(2));
};

const servicesByProvider = {
  AWS: ["EC2", "S3", "Lambda", "RDS"],
  Azure: ["VM", "Blob Storage", "Functions", "SQL Database"],
  GCP: ["Compute Engine", "Cloud Storage", "Cloud Functions", "Cloud SQL"],
  "Oracle Cloud": ["Compute", "Storage", "Functions", "Database"]
};
</script>

<template>
  <div class="task-details-container">
    <h2>Task Details</h2>
    <form>
      <div class="form-group">
        <label>Task ID:</label>
        <input type="text" v-model="editableTask.taskId" disabled />
      </div>

      <div class="form-group">
        <label>Task Name:</label>
        <input type="text" v-model="editableTask.taskName" :disabled="!isEditing" />
      </div>

      <div class="form-group">
        <label>Category:</label>
        <select v-model="editableTask.category" :disabled="!isEditing">
          <option value="" disabled>Select one</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
          <option value="Cloud">Cloud</option>
        </select>
      </div>

      <!-- Provider (only if category is 'Cloud') -->
      <div v-if="editableTask.category === 'Cloud'" class="form-group">
        <label>Provider:</label>
        <select v-model="editableTask.provider" :disabled="!isEditing">
          <option value="" disabled>Select provider</option>
          <option v-for="(services, provider) in servicesByProvider" :key="provider" :value="provider">
            {{ provider }}
          </option>
        </select>
      </div>

      <!-- Service (only if provider selected) -->
      <div v-if="editableTask.category === 'Cloud' && editableTask.provider" class="form-group">
        <label>Service:</label>
        <select v-model="editableTask.serviceType" :disabled="!isEditing">
          <option value="" disabled>Select service</option>
          <option v-for="service in servicesByProvider[editableTask.provider]" :key="service" :value="service">
            {{ service }}
          </option>
        </select>
      </div>

      <!-- Memory & Storage (only if service selected) -->
      <div v-if="editableTask.category === 'Cloud' && editableTask.provider && editableTask.serviceType">
        <div class="form-group">
          <label>Memory (in GB):</label>
          <input type="number" v-model="editableTask.memory" :disabled="!isEditing" min="0" />
        </div>

        <div class="form-group">
          <label>Storage (in GB):</label>
          <input type="number" v-model="editableTask.storage" :disabled="!isEditing" min="0" />
        </div>

        <div class="form-group">
          <label>Price ($):</label>
          <input type="text" :value="editableTask.price" disabled />
        </div>
      </div>

      <div class="form-group">
        <label>Status:</label>
        <input type="text" v-model="editableTask.status" :disabled="!isEditing" />
      </div>

      <div class="buttons">
        <button v-if="!isEditing" @click="enableEdit" type="button" class="edit-btn">Edit</button>
        <button v-if="isEditing" type="submit" @click="saveChanges" class="save-btn">Execute</button>
        <button v-if="isEditing" @click="cancelEdit" type="button" class="cancel-btn">Cancel</button>
      </div>
    </form>

    <!-- Execution Modal -->
    <ExecutionModel v-if="showExecutionModal" :taskId="task.taskId" @close="handleExecutionModalClose" />
    <router-view />
  </div>
</template>

<style scoped>
.task-details-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 8px;
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
</style>

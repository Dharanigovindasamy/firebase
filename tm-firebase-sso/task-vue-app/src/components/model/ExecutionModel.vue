<script setup>
import { ref, onMounted } from "vue";
import { useExecutionStore } from "@/store/executionStore";
import { useAdminStore } from "@/store/adminStore";
import { defineProps, defineEmits } from "vue";
// import {taskDetails} from "../Dashboard/Task/DetailTaskComponent.vue";
const props = defineProps({ taskId: Number , price: Number });
console.log("taskId in execution modelllllllllllll", props.taskId, "price in execution model", props.price);
const emit = defineEmits(["close"]);

// const taskDetails = taskDetails;
const executionStore = useExecutionStore();
const adminStore = useAdminStore();
// const taskStore = useTaskStore();
const admins = ref([]);
const newExecution = ref({
  taskId: props.taskId,
  assignee: "",
  date: "",
  comments: "",
  summary: "",
  issueType: " ",
  status: " ",
  priority: " ",
  estimatedTime: 0,
  actualTime: 0,
  attachments: null,
});

onMounted(() => {
  const result = adminStore.retrieveAdmin();
  if (Array.isArray(result)) {
    admins.value = result;
  } else if (result instanceof Promise) {
    result.then((data) => {
      admins.value = data;
    });
  }
});

// const handleFileUpload = (event) => {
//   const files = event.target.files;
//   newExecution.value.attachments =  Array.from(files);
//     // ? Array.from(files).map((file) => file.name)
//     // : null;
// };

const handleAddExecution = async(data) => {
  newExecution.value.taskId = props.taskId;
  console.log("taskId in execution model", newExecution.value.taskId);
  //store.createExecution(newExecution.value);
  console.log("newExecution in execution model", newExecution.value);
  console.log("data in execution model", data);
     try {
        const result = await executionStore.createExecution(data);
        console.log("Execution added and store updated", result);
      } catch (error) {
        console.error("Error adding execution:", error);
      }

  alert("Execution added successfully!");
  emit("close", props.price);   
};

const close = () => {
  emit("close",  props.price);
};
</script>

<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="execute">Execution Form</h2>
        <!-- <button class="close-btn" @click="close">X</button> -->
      </div>
      <div class="modal-body">
        <form class="execute-form" id="execution-form">
          <h2>Execution</h2>
          <label class="label" for="assignee" required>Assignee</label>
          <!-- <select class="select" v-model="newExecution.assignee">
      <option value="Select one" disabled>Select one</option>
      <option v-for="admin in admins" :key="admin.id" :value="admin.name">
        {{ admin.name }}
      </option>
    </select> -->
          <input
            class="input-field"
            v-model="newExecution.assignee"
            placeholder="Assignee"
            required
          />
          <label class="label" for="date">Date</label>
          <input
            class="input-field"
            required
            v-model="newExecution.date"
            type="date"
          />
          <label class="label" for="summary">Summary</label>
          <input
            class="input-field"
            v-model="newExecution.summary"
            placeholder="Summary"
            required
          />
          <label class="label" for="comments">Comments</label>
          <textarea
            class="comments"
            v-model="newExecution.comments"
            placeholder="Comments"
            required
          />
          <label class="label" for="issueType">Issue Type</label>
          <select class="select" required v-model="newExecution.issueType">
            <option value="" disabled selected>Select one</option>
            <option value="Task">Task</option>
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
          </select>
          <label class="label" for="status">Status</label>
          <select class="select" required v-model="newExecution.status">
            <option value="" disabled selected>Select one</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
          <label class="label" for="priority">Priority</label>
          <select class="select" required v-model="newExecution.priority">
            <option value="" disabled selected>Select one</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          <label class="label" for="estimatedTime"
            >Estimated Time(in hours)</label
          >
          <input
            class="input-field"
            v-model="newExecution.estimatedTime"
            type="number"
            min="0"
            placeholder="Estimated Time (in hours)"
            required
          />
          <label class="label" for="actualTime">Remaining Time (in hours)</label>
          <input
            class="input-field"
            v-model="newExecution.actualTime"
            type="number"
            min="0"
            placeholder="Remaining Time (in hours)"
            required
          />
          <!-- <label class="label" for="attachments">Attachments</label>
          <input
            class="input-field"
            type="file"
            id="attachments"
            multiple
            @change="handleFileUpload"
            required
          /> -->
        </form>
      </div>

      <div class="modal-footer">
        <button
          class="button"
          type="submit"
          @click="handleAddExecution(newExecution)"
          form="execution-form"
        >
          Add Execution
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.execute-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
  width: 75%;
  margin: 30px auto;
}

.label {
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
  gap: 10px;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 30%;
  margin: auto;
}
.input-field {
  width: 40%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.comments {
  width: 40%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  height: 100px;
}

.select {
  width: 40%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
  gap: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 50%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header,
.modal-footer {
  padding: 20px;
  background-color: #f1f1f1;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0px;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  overflow-y: auto;
  padding: 20px;
  flex-grow: 1;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.execute {
  font-weight: bold;
  font-size: 30px;
  margin: 0px;
  padding: 0px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

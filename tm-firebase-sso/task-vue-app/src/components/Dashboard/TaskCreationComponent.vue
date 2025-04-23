<template>
  <div>
    <div class="taskCreateContainer">
      <h6 class="create_task">Create Task</h6>

      <b-button @click="handleBack" class="back-button" type="back"
        >Back</b-button
      >
    </div>

    <div @submit.prevent="handleSubmit" class="task-container">
      <form class="createForm">
        <div class="form-group">
          <label for="taskId">Task ID:</label>
          <input type="number" id="taskId" v-model="task.taskId" disabled />
        </div>

        <div class="form-group">
          <label for="taskName">Task Name:</label>
          <input type="text" id="taskName" v-model="task.taskName" required />
        </div>

        <div class="form-group">
          <label for="category">Category:</label>
          <select id="category" v-model="task.category">
            <option value="Select one" disabled>Select one</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="Cloud">Cloud</option>
          </select>
        </div>

        <!-- <div class="form-group">
          <label for="status">Status:</label>
          <select id="status" v-model="task.status">
            <option value="Select one" disabled>Select one</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div> -->

        <div class="form-group">
          <label for="estimatedTime">Estimated Time (Days):</label>
          <input
            type="number"
            id="estimatedTime"
            v-model="task.estimatedTime"
            min="1"
          />
        </div>

        <div class="button-group">
          <b-button class="submit-button" type="submit">Submit</b-button>
          <b-button class="reset-button" type="button" @click="resetForm"
            >Reset</b-button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "@/store/taskStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    const taskStore = useTaskStore();
    const router = useRouter();

    const lastTaskId = computed(() =>
      taskStore.tasks.length > 0
        ? taskStore.tasks[taskStore.tasks.length - 1].taskId + 1
        : 1
    );

    const task = ref({
      taskId: lastTaskId.value,
      taskName: "",
      category: "Select one",
      estimatedTime: 1,
      // status:"Select one"
    });

    onMounted(() => {
      task.value.taskId = lastTaskId.value;
    });

    const handleSubmit = async () => {
      if (task.value.estimatedTime < 1) {
        alert("Estimated time must be at least 1 day.");
        return;
      }

      await taskStore.createTask(task.value);
      console.log("task added", task.value);
      alert("Task added successfully!", task.value);
      await taskStore.fetchTask();

      resetForm();
    };

    const handleBack = async () => {
      router.push({ name: "Home" });
    };

    const resetForm = () => {
      task.value = {
        taskId: lastTaskId.value,
        taskName: "",
        category: "Select one",
        estimatedTime: 1,
      };
    };

    return { task, handleSubmit, resetForm, handleBack };
  },
};
</script>

<style scoped>
.create_task {
  display: flex;
  flex-direction: row;
  text-align: center;
  margin-top: 15px;
  padding: 10px;
  font-size: 2rem;
  margin-left: 734px;
  margin-right: auto;
}

.task-container {
  max-width: 50%;
  display: flex;
  flex-direction: row;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  background: #f9f9f9;
}

h2 {
  text-align: center;
}

.form-group {
  display: flex;
  padding: 10px;
  align-items: center;
  margin-bottom: 15px;
}

label {
  width: 40%;
  font-weight: bold;
}

input,
select {
  width: 55%;
  padding: 5px;
}

.button-group {
  justify-items: center;
  justify-content: space-between;
  display: flex;
  gap: 20px;
  flex-direction: row;
  padding: 35px 270px;
}

button {
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  justify-items: center;
  justify-content: space-between;
}

button[type="submit"] {
  display: flex;
  flex-direction: row;
  background: #28a745;
  color: white;
  justify-items: center;
  justify-content: space-between;
  /* margin- */
}

button[type="button"] {
  display: flex;
  flex-direction: row;
  background: #dc3545;
  color: white;
  justify-items: center;
  justify-content: space-between;
}

.back-button {
  background-color: #719dd0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 85px;
  padding: 12px;
}

.taskCreateContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.createForm {
  display: flex;
  flex-direction: column;
}

button:hover {
  opacity: 0.8;
}
</style>

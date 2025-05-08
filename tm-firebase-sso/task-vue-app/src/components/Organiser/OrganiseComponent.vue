<template>
  <AppNavBar />
  <div class="task-board">
    <div class="content">
      <h4 class="board-title">Task Board</h4>
      <div class="board-columns">
        <!-- Pending Tasks Column -->
        <div class="board-column">
          <h4 class="column-title pending">
            <AlertCircleIcon class="status-icon" />
            Pending
          </h4>
          <div class="task-list-wrapper">
            <draggable
              class="task-list"
              v-model="pendingTasks"
              group="tasks"
              item-key="taskId"
              data-status="Pending"
              @end="onDragEnd"
            >
              <template #item="{ element }">
                <div
                  class="task-card pending-task"
                  :id="`task-${element.taskId}`"
                >
                  <div class="task-content">
                    <h5>{{ element.taskName }}</h5>
                    <p>{{ element.category }}</p>
                    <span class="task-id">{{ element.taskId }}</span>
                  </div>
                  <ClockIcon class="task-status-icon pending-icon" />
                </div>
              </template>
            </draggable>
          </div>
        </div>

        <!-- In Progress Tasks Column -->
        <div class="board-column">
          <h4 class="column-title in-progress">
            <LoaderIcon class="status-icon" />
            In Progress
          </h4>
          <div class="task-list-wrapper">
            <draggable
              class="task-list"
              v-model="inProgressTasks"
              group="tasks"
              item-key="taskId"
              data-status="In Progress"
              @end="onDragEnd"
            >
              <template #item="{ element }">
                <div
                  class="task-card in-progress-task"
                  :id="`task-${element.taskId}`"
                >
                  <div class="task-content">
                    <h5>{{ element.taskName }}</h5>
                    <p>{{ element.category }}</p>
                    <span class="task-id">{{ element.taskId }}</span>
                  </div>
                  <LoaderIcon class="task-status-icon in-progress-icon" />
                </div>
              </template>
            </draggable>
          </div>
        </div>

        <!-- Completed Tasks Column -->
        <div class="board-column">
          <h4 class="column-title completed">
            <CheckCircleIcon class="status-icon" />
            Completed
          </h4>
          <div class="task-list-wrapper">
            <draggable
              class="task-list"
              v-model="completedTasks"
              group="tasks"
              item-key="taskId"
              data-status="Completed"
              @end="onDragEnd"
            >
              <template #item="{ element }">
                <div
                  class="task-card completed-task"
                  :id="`task-${element.taskId}`"
                >
                  <div class="task-content">
                    <h5>{{ element.taskName }}</h5>
                    <p>{{ element.category }}</p>
                    <span class="task-id">{{ element.taskId }}</span>
                  </div>
                  <CheckCircleIcon class="task-status-icon completed-icon" />
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { onMounted, ref, watch } from "vue";
import { useTaskStore } from "../../store/taskStore";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import {
  AlertCircleIcon,
  LoaderIcon,
  CheckCircleIcon,
  ClockIcon,
} from "lucide-vue-next";
import AppNavBar from "../Layout/AppNavBar.vue";
import { useAuthStore } from "@/store/authStore";

export default {
  components: {
    draggable,
    AlertCircleIcon,
    LoaderIcon,
    CheckCircleIcon,
    ClockIcon,
    AppNavBar,
  },
  setup() {
    const taskStore = useTaskStore();
    const route = useRoute();
    const router = useRouter();
    const pendingTasks = ref([]);
    const inProgressTasks = ref([]);
    const completedTasks = ref([]);
    const authStore = useAuthStore();

    const updateTaskLists = (tasks) => {
      console.log("Updating task lists with tasks:", tasks);
      pendingTasks.value = tasks.filter((task) => task.status === "Pending");
      inProgressTasks.value = tasks.filter(
        (task) => task.status === "In Progress"
      );
      completedTasks.value = tasks.filter(
        (task) => task.status === "Completed"
      );

      console.log("Pending Tasks:", pendingTasks.value);
      console.log("In Progress Tasks:", inProgressTasks.value);
      console.log("Completed Tasks:", completedTasks.value);
    };

    const onDragEnd = (event) => {
      console.log("Drag ended:", event);

      const movedTaskId = Number(event.item.id.replace("task-", ""));
      console.log("Moved task id:", movedTaskId);
      const movedTask = taskStore.tasks.find(
        (task) => task.taskId === movedTaskId
      );
      console.log("Moved task:", movedTask);

      if (!movedTask) {
        console.error("Moved task not found");
        return;
      }

      console.log("Dragged card status (before drop):", movedTask.status);
      router.push("/execute");

      const newStatus = event.to.dataset.status;
      console.log(
        "Drop target status (event.to.dataset.status):",
        event.to.dataset.status
      );
      console.log("New status (target column):", newStatus);

      const taskIndex = taskStore.tasks.findIndex(
        (task) => task.taskId === movedTask.taskId
      );
      console.log("Task index:", taskIndex);
      if (newStatus && movedTask.status !== newStatus && taskIndex !== -1) {
        const originalTask = taskStore.tasks[taskIndex];
        const updatedTask = { ...originalTask, status: newStatus };

        taskStore.tasks[taskIndex] = updatedTask;

        try {
          taskStore.updateTask(updatedTask);
          console.log("Task updated in store:", updatedTask);
        } catch (error) {
          console.error("Error updating task in store:", error);
        }

        updateTaskLists(taskStore.tasks);
      } else {
        console.log("No status change needed (same column or invalid drop)");
      }
    };

    // onBeforeMount(() => {
    //   // Initialize and check auth state
    //   authStore.initializeAuth();

    //   const jwt = sessionStorage.getItem('jwt');
    //   console.log('JWT exists:', !!jwt);
    //   console.log('Auth state:', authStore.isAuthentication);

    //   if (!authStore.checkAuthStatus()) {
    //     console.log("User is not authenticated!");
    //     alert("You are not authenticated! in organise component");
    //     route.push('/');
    //   }
    // });

    onMounted(() => {
      if (!authStore.isAuthentication) {
        console.log("User is not authenticated!", authStore.isAuthentication);
        alert("You are not authenticated!");
        // window.location.href = "/";
        route.push("/");
      }
      const rowData = route.state?.rowData || [];
      console.log("Received rowData from TaskComponent:", rowData);
      if (rowData.length > 0) {
        taskStore.tasks = rowData;
        updateTaskLists(rowData);
      } else if (rowData.length === 0) {
        taskStore.fetchTask();
        console.log("Store tasks in organised:", taskStore.tasks);
        updateTaskLists(taskStore.tasks);
      } else {
        console.log("No rowData received, falling back to store tasks");
        taskStore.fetchTask();
        console.log("Store tasks :", taskStore.tasks);
        updateTaskLists(taskStore.tasks);
      }
    });

    watch(
      () => taskStore.tasks,
      (newTasks) => {
        console.log("Store tasks updated:", newTasks);
        updateTaskLists(newTasks);
      },
      { deep: true }
    );

    return { pendingTasks, inProgressTasks, completedTasks, onDragEnd };
  },
};
</script>

<style scoped>
.task-board {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background: #f4f5f7;
  padding: 40px 20px;
  box-sizing: border-box;
}

.content {
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}

.board-title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #172b4d;
  margin-bottom: 30px;
}

.board-columns {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.board-column {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 350px;
  min-height: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.column-title {
  font-size: 18px;
  font-weight: 600;
  color: #344563;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-list-wrapper {
  flex-grow: 1;
  overflow-y: auto;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* padding-right: 4px; */
  flex-grow: 1;
  min-height: 100px;
}

.task-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 2px 4px rgba(9, 30, 66, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.2s ease;
  cursor: grab;
  width: 90%;
  margin-top: 10px;
}

.task-card:hover {
  background-color: #f0f2f5;
  box-shadow: 0 4px 10px rgba(9, 30, 66, 0.15);
}

.task-content {
  flex-grow: 1;
}

.task-content h5 {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 600;
  color: #172b4d;
}

.task-content p {
  margin: 0;
  font-size: 13px;
  color: #5e6c84;
}

.task-id {
  font-size: 12px;
  color: #a5adba;
  margin-top: 4px;
  display: block;
}

.task-status-icon {
  font-size: 20px;
  margin-left: 12px;
  opacity: 0.85;
}

/* Icon colors */
.pending-icon {
  color: #de350b;
}
.in-progress-icon {
  color: #ffab00;
}
.completed-icon {
  color: #36b37e;
}

/* Scrollbar customization */
.task-list::-webkit-scrollbar {
  width: 6px;
}
.task-list::-webkit-scrollbar-thumb {
  background: #c1c7d0;
  border-radius: 3px;
}
</style>
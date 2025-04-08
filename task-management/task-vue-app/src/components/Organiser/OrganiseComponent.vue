<template>
  <div class="task-board">
    <div class="content">
      <h4 class="board-title">Task Board</h4>
      <div class="board-columns">
        <div class="board-column">
          <h4 class="column-title pending">
            <AlertCircleIcon class="status-icon" />
            Pending
          </h4>
          <draggable
            class="task-list"
            v-model="pendingTasks"
            group="tasks"
            item-key="taskId"
            data-status="Pending"
            @end="onDragEnd"
          >
            <template #item="{ element }">
              <div class="task-card pending-task" :id="`task-${element.taskId}`">
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

        <div class="board-column">
          <h4 class="column-title in-progress">
            <LoaderIcon class="status-icon" />
            In Progress
          </h4>
          <draggable
            class="task-list"
            v-model="inProgressTasks"
            group="tasks"
            item-key="taskId"
            data-status="In Progress"
            @end="onDragEnd"
          >
            <template #item="{ element }">
              <div class="task-card in-progress-task" :id="`task-${element.taskId}`">
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

        <div class="board-column">
          <h4 class="column-title completed">
            <CheckCircleIcon class="status-icon" />
            Completed
          </h4>
          <draggable
            class="task-list"
            v-model="completedTasks"
            group="tasks"
            item-key="taskId"
            data-status="Completed"
            @end="onDragEnd"
          >
            <template #item="{ element }">
              <div class="task-card completed-task" :id="`task-${element.taskId}`">
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
</template>

<script>
import draggable from "vuedraggable";
import { onMounted, ref, watch } from "vue";
import { useTaskStore } from "../../store/taskStore";
import { useRoute } from "vue-router"; // Import useRoute to access state
import { AlertCircleIcon, LoaderIcon, CheckCircleIcon, ClockIcon } from "lucide-vue-next";

export default {
  components: {
    draggable,
    AlertCircleIcon,
    LoaderIcon,
    CheckCircleIcon,
    ClockIcon,
  },
  setup() {
    const taskStore = useTaskStore();
    const route = useRoute(); 
    const pendingTasks = ref([]);
    const inProgressTasks = ref([]);
    const completedTasks = ref([]);

    const updateTaskLists = (tasks) => {
      pendingTasks.value = tasks.filter((task) => task.status === "Pending");
      inProgressTasks.value = tasks.filter((task) => task.status === "In Progress");
      completedTasks.value = tasks.filter((task) => task.status === "Completed");

      console.log("Pending Tasks:", pendingTasks.value);
      console.log("In Progress Tasks:", inProgressTasks.value);
      console.log("Completed Tasks:", completedTasks.value);
    };

    const onDragEnd = (event) => {
      console.log("Drag ended:", event);

      const movedTaskId = Number(event.item.id.replace("task-", ""));
      console.log("Moved task id:", movedTaskId);
      const movedTask = taskStore.tasks.find((task) => task.taskId === movedTaskId);
      console.log("Moved task:", movedTask);

      if (!movedTask) {
        console.error("Moved task not found");
        return;
      }

      console.log("Dragged card status (before drop):", movedTask.status);

      const newStatus = event.to.dataset.status;
      console.log("Drop target status (event.to.dataset.status):", event.to.dataset.status);
      console.log("New status (target column):", newStatus);

      const taskIndex = taskStore.tasks.findIndex((task) => task.taskId === movedTask.taskId);
      console.log("Task index:", taskIndex);

      if (newStatus && movedTask.status !== newStatus && taskIndex !== -1) {
        taskStore.tasks[taskIndex].status = newStatus;
        console.log(`Task ${movedTask.taskId} status updated to ${newStatus}`);

        const updatedTask = taskStore.tasks[taskIndex];
        console.log("Dragged card status (after drop):", updatedTask.status);

        updateTaskLists(taskStore.tasks);
      } else {
        console.log("No status change needed (same column or invalid drop)");
      }
    };

    onMounted(() => {
      const rowData = route.state?.rowData || [];
      console.log("Received rowData from TaskComponent:", rowData);
      if (rowData.length > 0) {
        taskStore.tasks = rowData;
        updateTaskLists(rowData);
      } else {
        console.warn("No rowData received, falling back to store tasks");
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
  padding: 20px;
}

.content {
  flex-grow: 1;
  margin-left: 250px;
  padding: 20px;
}

.board-title {
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
}

.board-columns {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
}

.board-column {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 30%;
  min-height: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.column-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.status-icon {
  margin-right: 8px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  min-height: 350px;
  background: #e1e4e8;
}

.task-card {
  display: flex;
  align-items: center;
  background: white;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  cursor: grab;
}

.task-content {
  flex-grow: 1;
}

.task-content h5 {
  margin: 0;
  font-size: 16px;
}

.task-id {
  font-size: 14px;
  color: gray;
}

.task-status-icon {
  margin-left: auto;
  font-size: 20px;
}

.pending-icon {
  color: #d32f2f;
}

.in-progress-icon {
  color: #fbc02d;
}

.completed-icon {
  color: #388e3c;
}
</style>
<script setup>
import { onMounted, ref, watch } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import { ClientSideRowModelModule } from "ag-grid-community";
import { useTaskStore } from "@/store/taskStore";
import { useRouter } from "vue-router";
import sidebarNavigation from "../Common/SidebarComponent.vue";
import DeleteButtonRenderer from "@/components/Dashboard/DeleteButtonRenderer.vue";

const modules = ref([ClientSideRowModelModule]);
const taskStore = useTaskStore();
const router = useRouter();
const rowData = ref(taskStore.tasks.length > 0 ? [...taskStore.tasks] : []);
const gridApi = ref(null);

const columnDefs = ref([
  {
    field: "taskId",
    headerName: "Task Id",
    sortable: true,
    filter: true,
    cellRenderer: (params) => {
      return `<span class="task-link" data-id="${params.value}">${params.value}</span>`;
    },
  },
  { field: "taskName", headerName: "Task Name", sortable: true, filter: true },
  { field: "category", headerName: "Category", sortable: true, filter: true },
  { field: "status", headerName: "Status", sortable: true, filter: true },
  {
    field: "delete",
    headerName: "Delete",
    cellRenderer: DeleteButtonRenderer,
  },
]);

const defaultColDef = ref({
  flex: 1,
  sortable: true,
  filter: true,
});

const onGridReady = (params) => {
  gridApi.value = params.api;
  console.log("Grid is ready:", gridApi.value);
};

const deletedTask = (taskId) => {
  taskStore.deleteTask(taskId);
  console.log("Deleting task with ID:", taskId);
  if (taskId && gridApi.value) {
    const rowNode = gridApi.value.getRowNode(taskId);
    if (rowNode) {
      gridApi.value.applyTransaction({ remove: [rowNode.data] });
    }
  }
};

onMounted(async () => {
  console.log("mounted", rowData.value);
  if (rowData.value.length === 0) {
    await taskStore.fetchTask();
    rowData.value = [...taskStore.tasks];
    console.log("row data", rowData.value);
  }
});

const onCellClicked = (event) => {
  if (event.column.colId === "taskId" && event.value) {
    console.log("Navigating to Task Details:", event.value);
    router.push({ name: "TaskDetails", params: { id: event.value } });
  }
};

watch(
  () => taskStore.tasks,
  (newTasks) => {
    rowData.value = [...newTasks];
    console.log("refreshh", newTasks);
  },
  { deep: true }
);

const handleAddTask = () => {
  router.push({ name: "AddTask" });
};
</script>

<template>
  <div>
    <sidebarNavigation />

    <h3 class="task-list">Task List</h3>

    <div class="container mt-4">
      <div class="task-progress">
        <b-button class="addTask" @click="handleAddTask">Add Task</b-button>
      </div>
      <div class="task-table">
        <div class="ag-theme-alpine custom-ag-grid">
          <AgGridVue
            :rowData="rowData"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            animateRows="true"
            rowSelection="multiple"
            :modules="modules"
            :context="deletedTask"
            @grid-ready="onGridReady"
            @cell-clicked="onCellClicked"
            :components="{ DeleteButtonRenderer }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.task-list {
  text-align: center;
  margin-top: 20px;
  padding: 15px;
  font-size: 2rem;
}
.task-progress {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
  padding: 15px;
  font-size: 1rem;
}
.deleteTask,
.addTask {
  margin-left: 10px;
  background-color: #719dd0;
}
.ag-layout-normal {
  height: auto !important;
}
.ag-theme-alpine .ag-header {
  background-color: #719dd0 !important;
  color: white !important;
  font-weight: bold;
  font-size: 16px;
}
.ag-theme-alpine .ag-cell {
  border-right: 1px solid #ddd !important;
  padding: 10px;
  font-size: 14px;
}
.ag-theme-alpine .ag-row-hover {
  background-color: #f1f1f1 !important;
}
.ag-theme-alpine .ag-row-selected {
  background-color: #d4e8ff !important;
}
.task-table {
  margin: 20px;
  align-content: center;
  align-items: center;
  margin-left: 250px;
  padding: 15px;
}
.task-link {
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}
.task-link:hover {
  color: #0056b3;
}
</style>
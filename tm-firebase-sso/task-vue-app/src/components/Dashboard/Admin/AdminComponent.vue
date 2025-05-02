<script>
import { defineComponent, ref, onMounted } from "vue";
// import BaseLayout from "../../Layout/BaseLayout.vue";
import AppNavBar from '../../Layout/AppNavBar.vue';
import HomePage from "../HomePage.vue";
import { useAdminStore } from "@/store/adminStore";
import router from "@/routes";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { AgGridVue } from "ag-grid-vue3";
import { useAuthStore } from "@/store/authStore"; 

ModuleRegistry.registerModules([ClientSideRowModelModule]);

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default defineComponent({
  name: "AdminComponent",
  components: {
    HomePage,
    // BaseLayout,
    AgGridVue,
    AppNavBar,
  },
  setup() {
    const adminStore = useAdminStore();
    const gridApi = ref(null);
    const rowData = ref([]);
    // const rowData = ref(adminStore.admin.length > 0 ? [...adminStore.admin] : "No Admin available");
    const authStore = useAuthStore();

    const isGridReady = ref(false);
    const modules = [ClientSideRowModelModule];
    const defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };

    const columnDefs = [
      { headerName: "ID", field: "adminId" },
      { headerName: "Name", field: "adminName" },
      { headerName: "Email", field: "email" },
      { headerName: "Role", field: "role" },
      { headerName: "Category", field: "category" },
      { headerName: "Contact Number", field: "phone" },
    ];

    const onGridReady = (params) => {
      gridApi.value = params.api;
    };

    const AddAdmin = () => {
      router.push("/admin/createAdmin");
    };

    onMounted(async () => {
       if(!authStore.isAuthentication) {
        console.log("User is not authenticated!", authStore.isAuthentication);
        alert("You are not authenticated!");
        window.location.href = "/";
      }
      await adminStore.retrieveAdmin();
      const adminData = adminStore.state.admin?.$values || [];
      console.log("Admin table", adminData);
      rowData.value = Array.isArray(adminData) ? adminData : [];
      console.log("rowdata table", rowData.value);
      isGridReady.value = true;
    });

    return {
      rowData,
      columnDefs,
      defaultColDef,
      onGridReady,
      AddAdmin,
      isGridReady,
      modules,
    };
  },
});
</script>

<template>
  <!-- <BaseLayout>  -->
    <AppNavBar /> 
    <home-page />

    <div class="admin-container">
      <div class="admin-header">
        <h3 class="admin">Admin</h3>
        <b-button class="create-admin" @click="AddAdmin">Create Admin</b-button>
      </div>

      <div class="grid-container">
        <AgGridVue
          v-if="isGridReady"
          class="ag-grid"
          :rowData="rowData"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :modules="modules"
          animateRows
          rowSelection="multiple"
          rowModelType="clientSide"
          @grid-ready="onGridReady"
        />
      </div>
    </div>
  <!-- </BaseLayout> -->
</template>

<style scoped>
.admin-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: auto;
  width: 70%;
  /* align-items: center;
  justify-content: center; */
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.create-admin {
  background-color: #5097e9;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
}
.admin {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-left: 300px;
  font-size: 2rem;
}

.grid-container {
  height: 300px;
  width: 100%;
  overflow-y: auto; 
}

.ag-grid {
  width: 100%;
  height: 100%;
}
</style>

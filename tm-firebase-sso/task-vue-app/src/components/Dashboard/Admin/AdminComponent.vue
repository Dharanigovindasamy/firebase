<script>
import { defineComponent, ref, onMounted } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import BaseLayout from  '../../Layout/BaseLayout.vue';
import HomePage from '../HomePage.vue';
import { useAdminStore } from '@/store/adminStore';
import router from '@/routes';

import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default defineComponent({
  name: 'AdminComponent',
  components: {
    HomePage,
    BaseLayout,
    AgGridVue,
  },
  setup() {
    const adminStore = useAdminStore();
    const gridApi = ref(null);
    const rowData = ref([]);
    const isGridReady = ref(false); 

    const defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };

    const columnDefs = [
      { headerName: 'ID', field: 'id' },
      { headerName: 'Name', field: 'name' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Role', field: 'role' },
      { headerName: 'Created At', field: 'created_at' },
    ];

    const onGridReady = (params) => {
      gridApi.value = params.api;
    };

    const AddAdmin = () => {
      router.push('/admin/createAdmin');
    };

    onMounted(async () => {
      await adminStore.retrieveAdmin();
      const adminData = adminStore.state.admin?.$values || [];
      rowData.value = Array.isArray(adminData) ? adminData : [];
      isGridReady.value = true;
    });

    return {
      rowData,
      columnDefs,
      defaultColDef,
      onGridReady,
      AddAdmin,
      isGridReady,
    };
  },
});
</script>

<template>
  <BaseLayout>
    <home-page />

  <div class="admin-container">
  <div class="admin-header">
    <h3>Admin</h3>
    <b-button class ="create-admin" @click="AddAdmin">Create Admin</b-button>
</div>

    <div class="ag-theme-alpine" style="height: 500px; width: 100%;">
      <AgGridVue
        v-if="isGridReady"
        class="ag-grid"
        :rowData="rowData"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        animateRows
        rowSelection="multiple"
        rowModelType="clientSide"
        @grid-ready="onGridReady"
      />
    </div>
  </div>
  </BaseLayout>
</template>

<style scoped>
.admin-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.create-admin{
  background-color: #5097e9;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
}
</style>

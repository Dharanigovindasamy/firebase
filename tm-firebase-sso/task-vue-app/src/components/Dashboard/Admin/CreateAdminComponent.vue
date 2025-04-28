<script>
import { defineComponent, ref } from 'vue';
import { useAdminStore } from '@/store/adminStore'; 
import router from '@/routes';

export default defineComponent({
  name: 'CreateAdminComponent',
  setup() {
    const adminName = ref('');
    const email = ref('');
    const password = ref('');
    const category = ref('');
    const phone = ref('');
    const role = ref('Admin');
    const adminStore = useAdminStore();

    const submitAdmin = async () => {
      const newAdmin = {
        adminName: adminName.value,
        email: email.value,
        password: password.value,
        category: category.value,
        phone: phone.value,
        role: role.value,
      };

      try {
        console.log('Creating Admin:', newAdmin);
        await adminStore.createAdmin(newAdmin);
        alert('Admin created successfully!');
        router.push('/admin'); 
      } catch (error) {
        console.error('Error creating admin:', error);
        alert('Failed to create admin.');
      }
    };
    const deleteAdmin = async () => {
      try {
        //await adminStore.deleteAdmin(adminName.value);
        alert('Admin deleted successfully!');
        router.push('/admin'); 
      } catch (error) {
        console.error('Error deleting admin:', error);
        alert('Failed to delete admin.');
      }
    };

    return {
      adminName,
      email,
      password,
      category,
      phone,
      role,
      submitAdmin,
      deleteAdmin
    };
  },
});
</script>
<template>
  <div class="create-admin-container">
    <h1 class="title">Create New Admin</h1>
    <form @submit.prevent="submitAdmin" class="admin-form">

      <div class="form-group">
        <label for="adminName">Admin Name</label>
        <input type="text" v-model="adminName" id="adminName" placeholder="Enter admin name" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" placeholder="Enter email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" placeholder="Enter password" required />
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <input type="text" v-model="category" id="category" placeholder="Enter category" required />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="text" v-model="phone" id="phone" placeholder="Enter phone number" required />
      </div>

      <div class="form-group">
        <label for="role">Role</label>
        <input type="text" v-model="role" id="role" placeholder="Enter role" required />
      </div>

      <b-button type="submit" class="submit-btn">Create Admin</b-button>
      <b-button type="delete" class="delete-btn" @click="deleteAdmin">Delete</b-button>
      
    </form>
  </div>
</template>

<style scoped>
.create-admin-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9fafb;
  padding: 30px;
}

.title {
  margin-bottom: 20px;
  font-size: 32px;
  color: #111827;
  font-weight: bold;
}

.admin-form {
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #374151;
}

.form-group input {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #f9fafb;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: #ffffff;
}

.submit-btn {
  padding: 14px;
  background-color: #3b82f6;
  color: white;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #2563eb;
}
</style>

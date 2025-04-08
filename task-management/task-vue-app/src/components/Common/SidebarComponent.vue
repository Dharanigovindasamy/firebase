<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <RouterLink class="navbar-brand d-flex align-items-center" to="/">
        <i class="bi fs-4 me-2"></i> Task Management
      </RouterLink>
    </div>

    <nav class="sidebar-nav">
      <RouterLink class="nav-link text-white" to="/register-login" @click="isMenuOpen = false">
        <i class="bi bi-house-door me-2"></i> Register & Login
      </RouterLink>
      <RouterLink class="nav-link text-white" to="/Home" @click="isMenuOpen = false">
        <i class="bi bi-house-door me-2"></i> Home
      </RouterLink>
      <RouterLink class="nav-link text-white" to="/Organise" @click="isMenuOpen = false">
        <i class="bi bi-folder me-2"></i> Organise
      </RouterLink>
    </nav>

    <div class="sidebar-footer">
      <a class="nav-link text-white settings-icon " href="#">
        <i class=" bi bi-gear-fill fs-4"></i> Settings
      </a>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background-color: #719dd0; 
  display: flex;
  flex-direction: column;
  padding: 35px;
  position: fixed; 
  top: 0;
  left: 0;
  box-shadow: 4px 0px 6px rgba(0, 0, 0, 0.1);
}

/* Sidebar Header */
.sidebar-header {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
   padding : 20px;
}

.nav-link {
  font-size: 1.2rem;
  transition: color 0.3s ease-in-out;
  display: flex;
  align-items: center;
}

.nav-link i {
  font-size: 1.3rem;
}

.nav-link:hover {
  color: #ffdd57 !important;
}

.settings-icon {
  margin-top: auto; 
  display: flex;
  padding : 20px;
  align-items: center;
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
}

.settings-icon:hover {
  transform: rotate(20deg);
  color: #ffdd57 !important;
}
</style>

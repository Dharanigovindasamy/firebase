<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-info">

    <RouterLink class="nav-link text-white" to="/register-login" @click="isMenuOpen = false">
        <img src = "@/assets/register.png" alt="firebase-register" /> Firebase Register & Login
      </RouterLink>

       <RouterLink class="nav-link text-white" to="/login" @click="isMenuOpen = false">
        <!-- <i class="bi bi-folder me-2"></i> -->
         <img src = "@/assets/login.png" alt="login" />
        Login 
      </RouterLink>

      <div class="welcome">
        <h3>Task Management </h3>
        <!-- <RouterLink class="navbar-brand d-flex" to="/">
          <i class="bi fs-4 me-2"></i> Task Management
        </RouterLink> -->

        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button> -->

        <!-- <div class="collapse navbar-collapse justify-content-center">
          <div class="d-flex gap-4">  
            <RouterLink class="nav-link text-white" to="/Home" @click="isMenuOpen = false">Home</RouterLink>
            <RouterLink class="nav-link text-white" to="/Organise" @click="isMenuOpen = false">Organise</RouterLink>
          </div>
        </div> -->

        <!-- <a class="nav-link text-white settings-icon" href="#">
          <i class="bi bi-gear-fill fs-4"></i>
        </a> -->
      </div>
    </nav>
  </div>
</template>

<style scoped>

.nav-link {
  transition: color 0.3s ease-in-out;
  margin: 20px;
  row-gap: 20px;
}
.nav-link:hover {
  color: #ffdd57 !important; }

.navbar {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.welcome {
  text-align: center;
    padding: 10px;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    /* margin: 5px; */
    margin-left: 90px;
}
</style>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-info">      
      <div class="admin-container">

        <RouterLink class="navbar-brand d-flex" to="/admin" @click="isMenuOpen = false">
          <i class="bi fs-4 me-2"></i>Admin
        </RouterLink>

        <RouterLink class="navbar-brand d-flex" to="/others" @click="isMenuOpen = false">
          <i class="bi fs-4 me-2"></i>Others
        </RouterLink>

        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button> -->

        <div class="collapse navbar-collapse justify-content-center">
          <div class="d-flex gap-4">  
            <RouterLink class="navbar-brand d-flex" to="/Task" @click="isMenuOpen = false">Task</RouterLink>
            <RouterLink class="navbar-brand d-flex" to="/Organise" @click="isMenuOpen = false">Organise</RouterLink>
          </div>
        </div> 

          <img class = "logout_img" src = "@/assets/logout.png" alt="logout" />

        <a class="nav-link text-white settings-icon" href="#">
          <i class="bi bi-gear-fill fs-4"></i>
        </a>
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

navbar-brand {
  font-size: 1.1rem;
  margin-right: 390px;
  font-weight: bold;
  color: #fff !important;
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

.admin-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 430px;
  gap: 20px;
}

.logout_img {
  width: 30px;
  height: 30px;
  margin-left: 30px;
}
</style>

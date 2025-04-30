<template>
    <div class="dashboard-header">
    <b-navbar class="navbar" toggleable="lg" type="dark" variant="dark">
      <div class="navbar-content">
        <img src="@/assets/task_m.png" class="logo" />
        <b-navbar-brand class="navbar-text" href="#">Task Management</b-navbar-brand>
      </div>
    </b-navbar>
    </div>
</template>

<style scoped>
.navbar {
  background-color: #0b0b0b; 
  padding: 10px 20px;
}
.navbar-content {
  display: flex;
  align-items: center;
}
.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.navbar-text {
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
}

</style>

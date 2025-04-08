<script> 
//import NavBarComponent from './components/Common/NavBarComponent.vue';
import sidebarNavigation from "../src/components/Common/SidebarComponent.vue";
// import AuthComponent from "./components/Common/AuthComponent.vue";

export default {
  components: {
    //NavBarComponent,
    sidebarNavigation,
    // AuthComponent
  },
};
</script>

<template>
  <div>
    <!-- <nav-bar-component /> -->
    <sidebarNavigation/>
     <!-- <AuthComponent/> -->
    <router-view /> 
  </div>
</template>

<style>
</style>

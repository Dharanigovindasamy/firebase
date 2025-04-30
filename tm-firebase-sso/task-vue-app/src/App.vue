<script> 
// import NavBarComponent from './components/Common/NavBarComponent.vue';
// import sidebarNavigation from "../src/components/Common/SidebarComponent.vue";
import AppHeader from '../src/components/Layout/AppHeader.vue';
import AppFooter from '../src/components/Layout/AppFooter.vue';
export default {
  components: {
    // NavBarComponent
    // sidebarNavigation
    AppHeader,
    AppFooter
  },
};
</script>

<template>
    <AppHeader />

  <div>
    <router-view /> 
  </div>
  <AppFooter />
</template>

<style>
</style>

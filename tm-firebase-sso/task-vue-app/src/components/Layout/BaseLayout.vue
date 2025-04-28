<template>
    <div>
        <AppHeader/>
        <AppNavBar/>
        <main>
            <slot></slot>
        </main>
        <AppFooter/>
    </div>
</template>
<script setup>
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import AppNavBar from './AppNavBar.vue';
</script>

<style scoped>

</style>